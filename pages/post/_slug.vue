<template>
  <main class="main m-4">
    <h1 class="title bg-gray-300 hover:bg-gray-400">{{ title }}</h1>
    <p class="publishedAt">{{ publishedAt }}</p>
    <div class="category">
      <nuxt-link :to="`/${category.id}`">
      {{ category && category.name }}
      </nuxt-link>
    </div>
    <div class="tag">
      <ul>
        <li v-for="tag in tags" :key="tag.id">{{tag.name}}{{tag.id}}</li>
      </ul>
    </div>
    <div class="post my-4 border-l bg-gray-200 p-4" v-html="body"></div>

    <PrevNextPost :next="next" :prev="prev" />
 
    <nuxt-link to="/">戻る</nuxt-link>
    <br><br>
    <div class="todo">
      <h2 class="mb-2 px-2 text-xl">New Todo</h2>
      <form class="mb-4 px-4">
        <input type="text" class="p-2 border" />
        <button class="ml-2 p-2 rounded text-white bg-blue-500">submit</button>
      </form>
      <h2 class="mb-2 px-2 text-xl">List Todo</h2>
      <ul class="py-2 px-4">
        <li class="p-2 border">
          <p class="border-b">todo 1</p>
          <p class="text-sm">2020 05/12</p>
        </li>
        <li class="mt-2 p-2 border">
          <p class="border-b">todo 2</p>
          <p class="text-sm">2020 05/12</p>
        </li>
        <li class="mt-2 p-2 border">
          <p class="border-b">todo 3</p>
          <p class="text-sm">2020 05/12</p>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import PrevNextPost from '~/components/PrevNextPost'

export default {
  layout: 'blog',
  components: {
    PrevNextPost
  },
  async asyncData( {$config , params }) {
    const { data } = await axios.get(
        $config.apiRoot + `/blog/${params.slug}`,
      {
        headers:{ 'X-API-KEY' : $config.apiKey }
      }
    )
    let current = data
    data.next = undefined
    data.prev = undefined
    const resNext = await axios.get(
        $config.apiRoot + '/blog/' +
        '?limit=1'+
        '&fields=id,title,publishedAt' +
        '&orders=publishedAt' +
        '&filters=publishedAt[greater_than]' + current.publishedAt,
      {
        headers:{ 'X-API-KEY' : $config.apiKey }
      }
    )
    const resPrev = await axios.get(
      $config.apiRoot + '/blog/' +
      '?limit=1'+
      '&fields=id,title,publishedAt' +
      '&orders=-publishedAt' +
      '&filters=publishedAt[less_than]' + current.publishedAt,   
      {
        headers:{ 'X-API-KEY' : $config.apiKey }
      }   
    )
    if ( resNext.data.contents && resNext.data.contents.length > 0 ){
      data.next = resNext.data.contents[0]
    }
    if ( resPrev.data.contents && resPrev.data.contents.length >0 ){
      data.prev = resPrev.data.contents[0]
    }
    const slug = "ページIDは" + params.slug // "/abc" パスにアクセスすると、slug は "abc" になります。
    console.log(slug)
    console.log(data)
    console.log(data.tags)
    return data
  },
}

</script>