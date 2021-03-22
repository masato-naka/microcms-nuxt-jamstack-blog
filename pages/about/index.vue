<template>
  <main>
    <h1>About</h1>
    <ol>
      <li v-for="(item, i) in filterItems" :key="i">
        {{ item }}
      </li>
    </ol>
    <div class="pagination">
      <div class="total">ページ {{page}}/{{totalPage}}</div>
    </div>    
  </main>
</template>

<script>
export default {
  data(){
    const items = new Array(200).fill(null).map((e, i) => `Item ${i + 1}`);
    const perPage = 10;

    return{
      items,
      page: 1,
      perPage,
      totalPage: Math.ceil(items.length / perPage),
      count: items.length
    }
  },
  computed: {
    filterItems() {
      return this.items.filter(
        (item, i) =>
          i >= (this.page - 1) * this.perPage &&
          i < this.page * this.perPage
      );
    }
  },
}
</script>