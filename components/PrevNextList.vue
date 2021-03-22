<template>
  <div>
    <div class="page">ページ {{ currentPage }} / {{ totalPage }}</div>
    <div>
      <ul class="pagenation">
        <li v-if="currentPage > 1">
          <nuxt-link
          :to="`/page/${prevPage}`"
          @click.native="changePage(currentPage - 1)">
            «
          </nuxt-link>          
        </li>
        <li v-for="page in frontPageRange"
        :key="page"
        :class="(isCurrent(page)) ? 'active' : 'inactive'">
          <nuxt-link :to="`/page/${page}`" @click.native="changePage(page)">
            {{ page }}
          </nuxt-link>
        </li>
        <li v-show="frontDot" class="inactive">...</li>
        <li v-for="page in middlePageRange"
        :key="page"
        :class="(isCurrent(page)) ? 'active' : 'inactive'">
          <nuxt-link :to="`/page/${page}`" @click.native="changePage(page)">
            {{ page }}
          </nuxt-link>
        </li>
        <li v-show="endDot" class="inactive">...</li>
        <li v-for="page in endPageRange"
        :key="page"
        :class="(isCurrent(page)) ? 'active' : 'inactive'">
          <nuxt-link :to="`/page/${page}`" @click.native="changePage(page)">
            {{ page }}
          </nuxt-link>
        </li>
        <li v-if="currentPage < totalPage">
          <nuxt-link
          :to="`/page/${nextPage}`"
          @click.native="changePage(currentPage + 1)">
            »
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    page: {
      type : Number,
      required: true
    },
    totalPage: {
      type : Number,
      required: true
    },
  },
  data(){
    return{
      currentPage: this.page,
      start: "",
      end: "",
      range: 5,
      frontDot: false,
      endDot: false,
      size: 7,
    };
  },  
  computed: {
    prevPage() {
      return Math.max(this.currentPage - 1, 1);
    },
    nextPage() {
      return Math.min(this.currentPage + 1);
    },

    frontPageRange(){
      if (!this.sizeCheck) {
        return this.callRange(1, this.totalPage);
      }
      return this.callRange(1,2);
    },
    middlePageRange(){
      if (!this.sizeCheck) return [];
      let start = "";
      let end = "";

      if ( this.currentPage <= this.range ) {
        start = 3;
        end = this.range + 2;
        this.frontDot = false;
        this.endDot = true;
      } else if ( this.currentPage > this.totalPage - this.range ){
        start = this.totalPage - this.range - 1;
        end = this.totalPage - 2;
        this.frontDot = true;
        this.endDot = false;
      } else {
        start = this.currentPage - Math.floor(this.range / 2);
        end = this.currentPage + Math.floor(this.range / 2);
        this.frontDot = true;
        this.endDot = true;
      }
      return this.callRange(start, end);
    },
    endPageRange(){
      if (!this.sizeCheck){
        console.log("sss")
        return [];
      }
      return this.callRange(this.totalPage - 1, this.totalPage)
    },
    sizeCheck(){
      if( this.totalPage <= this.size ){
        return false;
      }
      return true;
    },
  },  
  methods: {
    callRange(start,end){
      const range = [];
      for(let i = start; i <= end; i++){
        range.push(i);
      }
      return range
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPage) {
        this.currentPage = page;
        this.$emit("change", this.currentPage);
      }
    },    
    isCurrent(page) {
      return page === this.currentPage;
    }, 
  },

}
</script>

<style scoped>
.pagenation {
  display: flex;
  list-style-type: none;
}
.pagenation li {
  border: 1px solid #ddd;
  padding: 6px 12px;
  text-align: center;
}
.pagenation a{
  display: block;
}
.pagenation li + li{
  border-left: none;
}
.active{
  background : #000;
  color: #fff;
}
</style>