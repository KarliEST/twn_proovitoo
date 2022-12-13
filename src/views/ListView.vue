<template>
  <div>
    <div id="list">
      <div>
        <h1>Nimekiri</h1>
      </div>
      <div>
        <div class="d-flex justify-content-center" id="table">
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
              <tr class="pointer" @click="toggle(item.id)" :class="{ opened: opened.includes(item.id) }"
                  role="button" tabindex="0">
                <td>{{ item.firstname }}</td>
                <td>{{ item.surname }}</td>
                <td>{{ item.sex }}</td>
                <td>{{ item.dob }}</td>
                <td>{{ item.phone }}</td>
              </tr>
              <tr  v-if="opened.includes(item.id)">
                <td colspan="5" style="background-color: white">
                  <div class="tab">
                    <div id="image" class="d-flex justify-content-center">
                      <img class="image" :src="item.image.large" :alt="item.image.alt" :title="item.image.title"
                           role="img">
                    </div>
                    <div class="d-flex justify-content-center" id="body">
                      {{ truncate(item.body, 300) }}
                      <a class="twn-button_small" :href="articleLink(item.id)">Loe
                        rohkem</a>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            </tbody>
          </table>

        </div>
        <div>
          <nav class="d-flex justify-content-center">
            <button :disabled="currentPage===1" class="pagination-button pointer" id="prev-button" title="Previous page"
                    aria-label="Previous page"
                    @click="prevPage">&lt
            </button>
            <button class="pointer" id="pagination-numbers" @click="currentPage = page" v-for="page in pages">
              {{
                page
              }}
            </button>
            <button :disabled="currentPage===pages" class="pagination-button pointer" id="next-button" title="Next page"
                    aria-label="Next page" @click="nextPage">
              &gt
            </button>
          </nav>
        </div>


      </div>
    </div>
    debug: sort={{ currentSort }}, dir={{ currentSortDir }}, currentpage={{ currentPage }}
  </div>
</template>

<script>
import json from '@/assets/list.json'

export default {
  name: "ListView",
  el: '#list',
  data() {
    return {
      json: json,
      currentSort: '',
      currentSortDir: 'default',
      pageSize: 10,
      currentPage: 1,
      pages: 0,
      articleId: '',
      opened: [],
      tableArray: [],
    };
  },
  methods: {

    generateTableArray() {
      let list = this.json.list;
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


    toggle(articleId) {
      const index = this.opened.indexOf(articleId);
      // document.getElementById("body").innerHTML += this.json.intro;
      if (index > -1) {
        this.opened.splice(index, 1)
      }
      else {
        this.opened.push(articleId)
      }
    },

    sort(s) {
      if (s!==this.currentSort||this.currentSortDir==='default') {
        this.currentSortDir = 'asc';
      }else if (s === this.currentSort && this.currentSortDir === 'asc') {
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
  mounted() {
    console.log(this.json.list);
    this.generateTableArray();
    console.log(this.tableArray);
    this.pageCounter();

    // axios
    //     .get('https://midaiganes.irw.ee/api/list?limit=500')
    //     .then(response => (
    //         this.json = response.data
    //     ));
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

table {
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: 10px 10px 0 10px;
}
table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  /*cursor: pointer;*/
  padding: 8px;
  min-width: 30px;
}
/*table th:hover {*/
/*  background: #717699;*/
/*}*/
table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
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
  border: 3px solid #44475C;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  /*cursor: pointer;*/
  padding: 8px;
  min-width: 30px;
}
/*table th:hover {*/
/*  background: #717699;*/
/*}*/
table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}
.flex-container {
  display: flex;
}

.flex-child {
  flex: 1;
  border: 2px solid yellow;
}

.flex-child:first-child {
  margin-right: 20px;
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
  font-size: 1.1rem;
  background-color: transparent;
  border: none;
  margin: 0.25rem 0.25rem;
  cursor: pointer;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: .2rem;
}

.pagination-number:hover,
.pagination-button:not(.disabled):hover {
  background: #fff;
}

.pagination-number.active {
  color: #fff;
  background: #0085b6;
}
.tab {
  display: flex;

}

.pointer {
  cursor: pointer;
}
</style>
