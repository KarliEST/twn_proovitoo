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
              <th scope="col">Eesnimi</th>
              <th scope="col">Perekonnanimi</th>
              <th scope="col">Sugu</th>
              <th scope="col">Sünnikuupäev</th>
              <th scope="col">Telefon</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
              <td>{{ item.firstname }}</td>
              <td>{{ item.surname }}</td>
              <td>{{ getSex(item.sex) }}</td>
              <td>{{ getDate(item.date) }}</td>
              <td>{{ item.phone }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div id="buttons">

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import json from '@/assets/list.json'

export default {
  name: "ListView",
  el: '#list',
  data() {
    return {
      json: json,
      list: json.list,
    };
  },
  methods: {

    getDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [day, month, year].join('.');
    },
    getSex(sex) {
      if (sex === 'f') {
        return 'Naine';
      } else {
        return 'Mees';
      }
    },
    paginate(array, pageSize, pageNumber) {
      return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    },
  },
  mounted() {
    // axios
    //     .get('https://midaiganes.irw.ee/api/list?limit=500')
    //     .then(response => (
    //         this.json = response.data
    //     ));
  },
}
</script>

<style scoped>

</style>
