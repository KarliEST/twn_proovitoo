<template>
  <div class="page">
    <div id="list" class="inline">
      <div>
        <h1>Nimekiri</h1>
      </div>
      <div style="box-sizing: border-box">
        <div class="table-wrapper" id="table">
          <table>
            <thead>
            <tr>
              <th class="pointer" role="button" @click="sort('firstname')">Eesnimi</th>
              <th class="pointer" role="button" @click="sort('surname')">Perekonnanimi</th>
              <th class="pointer" role="button" @click="sort('sex')">Sugu</th>
              <th class="pointer" role="button" @click="sort('dob')">Sünnikuupäev</th>
              <th>Telefon</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="item in sortedList" id="paginated-list">
              <tr class="pointer" @click="toggle(item.id)" :class="{ opened: opened.includes(item.id) }">
                <td style="width: 20%">{{ item.firstname }}</td>
                <td style="width: 20%">{{ item.surname }}</td>
                <td style="width: 20%">{{ item.sex }}</td>
                <td style="width: 20%">{{ item.dob }}</td>
                <td style="width: 20%">{{ item.phone }}</td>
              </tr>
              <tr v-if="opened.includes(item.id)">
                <td colspan="5" style="background-color: white">
                  <div class="tab">
                    <div id="image" class="d-flex justify-content-center">
                      <img class="image" :src="item.image.large" :alt="item.image.alt" :title="item.image.title"
                           role="img">
                    </div>
                    <div style="color: black" class="d-flex justify-content-center" id="body">
                      <!--                                    <p>{{ truncate(item.body, 300) }}</p>-->
                      {{ insertBody(item.body) }}
                      <a class="tab-button" :href="articleLink(item.id)">Loe rohkem</a>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
        <div>
          <div class="d-flex justify-content-center">
            <button :disabled="currentPage===1" class="pagination-button" id="prev-button" title="Previous page"
                    aria-label="Previous page"
                    @click="prevPage">&lt
            </button>
            <button class="pagination-number" @click="currentPage = page" v-for="page in pages">
              {{ page }}
            </button>
            <button :disabled="currentPage===pages" class="pagination-button" id="next-button" title="Next page"
                    aria-label="Next page" @click="nextPage">
              &gt
            </button>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
// import json from '@/assets/list.json'
import axios from "axios";

export default {
  name: "ListView",
  el: '#list',
  data() {
    return {
      json: [],
      url: 'https://midaiganes.irw.ee/api/list?limit=500',
      currentSort: '',
      currentSortDir: 'default',
      pageSize: 10,
      currentPage: 1,
      pages: 0,
      articleId: '',
      opened: [],
      tableArray: [],
      toggleId: '',

    };
  },
  methods: {

    async generateTableArray() {
      const json = await axios.get(this.url);
      this.json = json.data;
      let list = this.json.list;
      // console.log(this.json);
      let i = 0;
      while (list[i]) {
        this.tableArray.push({
          firstname: list[i].firstname,
          surname: list[i].surname,
          sex: this.convertSex(list[i].sex),
          dob: this.dateOfBirth(list[i].personal_code),
          phone: list[i].phone,
          image: list[i].image,
          body: list[i].body,
          id: list[i].id
        })
        i++;
      }
    },

    insertBody(body) {
      if (this.toggleId === -1) {
        let element = document.getElementById('body');
        return element.innerHTML = body;
      }
      return null;
    },

    toggle(articleId) {
      const index = this.opened.indexOf(articleId);
      if (articleId === this.articleId) {
        this.opened.splice(index, 1);
      }
      this.toggleId = articleId;
      // console.log(this.toggleIndex);
      // if (this.toggleIndex === -1 || (this.toggleIndex === -1 && index === 0)) {
      //   this.opened.splice(index, 1);
      // }
      // this.opened.push(articleId);


      if (index > -1) {
        this.opened.splice(index, 1)
      } else {
        this.opened.push(articleId)
      }
    },

    sort(s) {
      if (s !== this.currentSort || this.currentSortDir === 'default') {
        this.currentSortDir = 'asc';
      } else if (s === this.currentSort && this.currentSortDir === 'asc') {
        this.currentSortDir = 'desc';
      } else {
        this.currentSortDir = 'default';
      }
      this.currentSort = s;
    },

    pageCounter() {
      this.pages = Math.ceil(this.tableArray.length / this.pageSize);
    },

    nextPage() {
      if ((this.currentPage * this.pageSize) < this.tableArray.length) this.currentPage++;
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    articleLink(id) {
      return 'http://proovitoo.twn.ee/article/' + id;
    },

    dateOfBirth(personalCode) {
      let yearPrefix = '';
      personalCode = personalCode.toString();
      if (personalCode[0] === '3' || personalCode[0] === '4') {
        yearPrefix = '19';
      } else {
        yearPrefix = '20';
      }
      let month = personalCode[3] + personalCode[4];
      let day = personalCode[5] + personalCode[6];
      let year = yearPrefix + personalCode[1] + personalCode[2];
      return year + '-' + month + '-' + day;
    },

    convertSex(sex) {
      if (sex === 'f') {
        return 'Naine';
      } else {
        return 'Mees';
      }
    },
    truncate(value, length) {
      if (value.length > length) {
        return value.substring(0, length) + "...";
      } else {
        return value;
      }
    },
  },
  computed: {

    sortedList() {
      let arrayCopy = [...this.tableArray];
      return arrayCopy.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (this.currentSortDir === 'default') return 0;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    },

  },
  async mounted() {
    await this.generateTableArray();
    this.pageCounter();
  },
}
</script>

<style scoped>
.image {
  width: 12.5rem;
  height: 12.5rem;
  flex-shrink: 0;
  flex-grow: 0;
  background: center center no-repeat;
  background-size: cover;
  margin: .375rem;
  background-color: #f1f1f1;
}

.inline {
  position: relative;
}

.inline {
  max-width: var(--twnMaxWidth);
  min-height: 100%;
  margin: 0 auto;
}

.page {
  background-image: url(@/assets/imgs/bg-deco-left.svg), url(@/assets/imgs/bg-deco-right.svg);
  background-repeat: no-repeat;
  background-position: var(--twn-menuWidth) bottom, 100% 0;
  background-size: 150px, 250px;
  background-attachment: fixed;
  display: block;
  margin-left: var(--twn-menuWidth);
  height: 100vh;
  overflow: auto;
  padding: 5rem 2.5rem;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

table {
  border-collapse: collapse;
  min-width: 100%;
  font-size: 1rem;
  table-layout: fixed;
}


table th {
  text-align: left;
  background: #333;
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
}

table td:last-child {
  border-right: none;
}

table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}

table {
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  margin: 10px 10px 0 10px;
}

table th {
  text-align: left;
  background: #333;
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
}

table td:last-child {
  border-right: none;
}

table tbody tr:nth-child(2n) td {
  background: #44475C;

}

.pagination-container {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  justify-content: center;
}

.pagination-number,
.pagination-button {
  color: white;
  font-size: 1.1rem;
  background-color: transparent;
  border: none;
  margin: 0.25rem 0.25rem;
  cursor: pointer;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 2.5rem;
}

.pagination-number:hover,
.pagination-button:not(:disabled):hover {
  background-color: transparent;
  border-style: solid;
  border-width: 1px;
  border-color: white;
}


.pagination-number:focus {
  color: black;
  background: white;
}

.tab {
  display: flex;

}

.table-wrapper {
  display: block;
  overflow: inherit;
  width: 100%;
}

.tab-button {
  font-size: .75rem;
  padding: .85em 1.7em;
  margin-top: 20px;
  display: inline-block;
  margin: 0 0 16px;
  transition: background-color .25s ease-out;
  font-family: var(--twn-font);
  font-weight: 700;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  background-color: #14cc76;
  color: #3a3d57;
  appearance: none;
  border: none;
  text-decoration: none;
  border-bottom: .25rem solid #37945C;
  text-transform: uppercase;
}

.opened {
  background: white;
  color: black;
}

.pointer {
  cursor: pointer;
}

</style>
