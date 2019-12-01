<template>
  <div class="mt-3" v-if="video">
    <h5>{{ video.snippet.title }}</h5>
    <iframe width="500" height="300" :src="videoUrl" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>

<script>
export default {
    name:"SelectedVideo",
    props : {
        video : {
            type : Object,
        }
    },
    computed : {
        videoUrl() {
            return `https://youtube.com/embed/${this.video.id.videoId}/`
        }
    }
}
</script>

<style>

</style>