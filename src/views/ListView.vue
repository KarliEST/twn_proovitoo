<template>
  <div>
    <div id="list">
      <div>
        <h1>Nimekiri</h1>
      </div>
      <div>
        <div class="table" id="table">
          <table>
            <thead>
            <tr>
              <th @click="sort('firstname')">Eesnimi</th>
              <th @click="sort('surname')">Perekonnanimi</th>
              <th @click="sort('sex')">Sugu</th>
              <th @click="sort('personal_code')">Sünnikuupäev</th>
              <th>Telefon</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="item in sortedList" id="paginated-list">
              <tr @click="toggle(item.id)" :class="{ opened: opened.includes(item.id) }">
                <td>{{ item.firstname }}</td>
                <td>{{ item.surname }}</td>
                <td>{{ getSex(item.sex) }}</td>
                <td>{{ dateOfBirth(item.personal_code) }}</td>
                <td>{{ item.phone }}</td>
              </tr>
              <tr v-if="opened.includes(item.id)">
                <!--              <td colspan="2">ON!</td>-->
                <!--                {{ tab(item.id) }}-->
                <td>
                  <div class="flex-container">
                    <div id="image" class="flex-child magenta">
                      <img class="image" :src="item.image.large" :alt="item.image.alt">
                    </div>
                    <div class="flex-child green" id="body">
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
        <nav class="pagination-container">
          <button :disabled="currentPage===1" class="pagination-button" id="prev-button" title="Previous page"
                  aria-label="Previous page"
                  @click="prevPage">&lt
          </button>
          <button id="pagination-numbers" @click="currentPage = page" v-for="page in pages">{{ page }}</button>
          <button :disabled="currentPage===pages" class="pagination-button" id="next-button" title="Next page"
                  aria-label="Next page" @click="nextPage">
            &gt
          </button>
        </nav>
      </div>
    </div>
    debug: sort={{ currentSort }}, dir={{ currentSortDir }}, currentpage={{ currentPage }}
  </div>
</template>

<script>
import axios from "axios";
import json from '@/assets/list.json'
// import {truncate} from "fs";

export default {
  name: "ListView",
  el: '#list',
  data() {
    return {
      json: json,
      list: json.list,
      currentSort: '',
      currentSortDir: 'default',
      pageSize: 10,
      currentPage: 1,
      pages: 0,
      articleId: '',
      opened: [],
      sortingDate: '',

    };
  },
  methods: {

    toggle(articleId) {
      const index = this.opened.indexOf(articleId);
      // document.getElementById("body").innerHTML += this.json.intro;
      if (index > -1) {
        this.opened.splice(index, 1)
      } else {
        this.opened.push(articleId)
      }
    },

    sort(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      // if (s === this.currentSort) {
      //   this.currentSortDir = this.currentSortDir === 'desc' ? 'default' : 'desc';
      // }
      // if (s === this.currentSort) {
      //   this.currentSortDir = this.currentSortDir === 'default' ? 'asc' : 'default';
      // }
      this.currentSort = s;
    },

    pageCounter() {
      this.pages = Math.ceil(this.list.length / this.pageSize);
    },

    nextPage() {
      if ((this.currentPage * this.pageSize) < this.list.length) this.currentPage++;
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    articleLink(id) {
      return 'http://proovitoo.twn.ee/article/'+id;
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
      let date = year + '-' + month + '-' + day;
      this.sortingDate = year + month + day;
      return date;
    },

    getSex(sex) {
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
      return this.list.sort((a, b) => {
        let modifier = 1;
        // if (this.currentSortDir === 'default') modifier = 0;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    },

  },
  mounted() {
    console.log(this.list);
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
</style>
