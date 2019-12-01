<template>
  <div id="app">
    <!-- <button @click="TakeALookChoice">떼껄룩</button>
    <button @click="YDDChoice">윤딴딴</button> -->
    <SelectedVideo :video="video"/>
    <TodoList />
  </div>
</template>

<script>
import axios from 'axios'
import SelectedVideo from './components/SelectedVideo.vue'
import TodoList from './components/TodoList.vue'
const API_KEY = "AIzaSyDpYW9zUVGIXbUot_H7XOgu-Y_Qvb-EIns"
export default {
  name: 'app',
  components: {
    SelectedVideo,
    TodoList
  },
  data() {
    return {
      TakeALookVideos: [],
      YDDVideos: [],
      video : null,
    }
  },
  methods : {
    TakeALookChoice () {
      var random = Math.floor(Math.random() * this.TakeALookVideos.length)
      this.video = this.TakeALookVideos[random]
    },
    YDDChoice () {
      var random = Math.floor(Math.random() * this.YDDVideos.length)
      this.video = this.YDDVideos[random]
    }
  },
  mounted() {
    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params :{
        key : API_KEY,
        part : 'snippet',
        videoEmbeddable : "true",
        channelId : 'UCVut4hqvrjQC4qDE3oc5qig',
        maxResults : 50,
        type : "video"
      }
    }).then(response => {
      this.TakeALookVideos = response.data.items
      console.log(response.data.items)
    }).catch(error => {
      console.log(error)
    })
    var params = new URLSearchParams()
      params.append('key',API_KEY)
      params.append('part',"snippet")
      params.append('videoSyndicated',"true")
      params.append('videoDuration','medium')
      params.append('videoDuration','short')
      params.append('order',"viewCount")
      params.append('channelId',"UChnbG-BYQKXrOBb-83KO-UQ")
      params.append('type',"video")
      params.append('maxResults',30)
    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params : params
    }).then(response => {
      this.YDDVideos = response.data.items
      console.log(response.data.items)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
p {
  font-size: 20px;
}
</style>