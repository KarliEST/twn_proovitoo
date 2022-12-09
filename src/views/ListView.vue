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
            <tr>
              <td>

              </td>
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
    getData() {
      console.log(json);
    },
  },
  mounted() {
    this.getData();
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
