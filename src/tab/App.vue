<template>
  <div id="app">
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
      YoutubeVideos: [],
      video : null,
    }
  },
  methods : {
    VideioChoice () {
      var random = Math.floor(Math.random() * this.Videos.length)
      this.video = this.YoutubeVideos[random]
    }
  },
  // mounted() {
  //   axios.get('https://www.googleapis.com/youtube/v3/search', {
  //     params :{
  //       key : API_KEY,
  //       part : 'snippet',
  //       videoEmbeddable : "true",
  //       channelId : 'UCVut4hqvrjQC4qDE3oc5qig',
  //       maxResults : 50,
  //       type : "video"
  //     }
  //   }).then(response => {
  //     this.YoutubeVideos = response.data.items
  //   }).catch(error => {
  //     console.log(error)
  //   })
  //   var params = new URLSearchParams()
  //     params.append('key',API_KEY)
  //     params.append('part',"snippet")
  //     params.append('videoSyndicated',"true")
  //     params.append('videoDuration','medium')
  //     params.append('videoDuration','short')
  //     params.append('order',"viewCount")
  //     params.append('channelId',"UChnbG-BYQKXrOBb-83KO-UQ")
  //     params.append('type',"video")
  //     params.append('maxResults',30)
  //   axios.get('https://www.googleapis.com/youtube/v3/search', {
  //     params : params
  //   }).then(response => {
  //     this.YoutubeVideos = response.data.items
  //     console.log(response.data.items)
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }
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