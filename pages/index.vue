<template>
  <div>
    <Logo />
    <p class="font-bold">記事一覧</p>
    <div>
      <ul>
        <li v-for="content in contents" :key="content.id">
          <nuxt-link :to="`/post/${content.id}`">
            {{ content.title }}
          </nuxt-link>
        </li>
      </ul>
      <br>
      <PrevNextList :page="page" :totalPage="totalPage" @change="onPageChange" />
    </div>
    <br>
    <br>
    <p class="mt-4 font-bold"> 以下はカテゴリ一覧</p>
    <div class="category">
      <ul>
        <li>
          <li v-for="category in categories" :key="category.id">
            <nuxt-link :to="`/category/${category.id}`">
              {{ category.name }}
            </nuxt-link>
        </li>
      </ul>
    </div>
    <nuxt-link to="about">about</nuxt-link>
    <nuxt-link to="about/2">about 2</nuxt-link>
  </div>
</template>

<script>
import axios from 'axios'
import Logo from '~/components/Logo.vue'
import PrevNextList from '~/components/PrevNextList.vue'

export default {
  components: {
    Logo,
    PrevNextList
  },
  async asyncData({ $config , params }) {
    const pageParam = params.p||'1'
    const page = Number(pageParam)
    const limit = 5
    const { data } = await axios.get(
        $config.apiRoot + `/blog/?limit=${limit}&offset=${(page - 1) * limit}`,
      {
        headers:{ 'X-API-KEY' : $config.apiKey }
      }
    )
    const resCategories = await axios.get(
        $config.apiRoot + '/categories/',
      {
        headers:{ 'X-API-KEY' : $config.apiKey }
      }
    ).then((res) => {
      return res.data.contents
    })
    const totalPage = Math.ceil( data.totalCount / limit )
    data.categories = resCategories
    data.page = page
    data.totalPage = totalPage
    return data
  },
  methods: {
    onPageChange(page){
      this.page = page
    }
  }
}

</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
