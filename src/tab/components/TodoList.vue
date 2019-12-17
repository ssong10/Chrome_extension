<template>
  <div style="width:100%;text-align:center;display:inline-block;">
    <h1 :style="{'color':color, 'font-size':headfont }">To Do List</h1>
    <h3 style="color:var(--warning)">{{time}}</h3>
    <select style="margin-top:10px;margin-bottom:10px" v-model="status">
      <option value="all">모두보기</option>
      <option value="complete">완료</option>
      <option value="active">할 일</option>
    </select><br>
    <div style="width:300px;opacity:0.4" class="p-3 bg-dark container inline-block;">
    <!-- <button class="btn btn-secondary" @click="allCompleted">모두 완료</button> -->
    <button class="btn btn-outline-light" @click="clearCompleted">완료 삭제</button> <br>
    <ul style="color:#ffffff; display:inline-block;text-align:left">
      <li style="list-style:none" :style="{'font-size':font}" v-for="todo in todosBystatus"
        :class="{completed: todo.completed}" :key="todo.id">
        <input type="checkbox" v-model="todo.completed">
        {{todo.content}}
      </li>
    </ul>
    <input style="background-color:var(--secondary);border-style:none;color:var(--light)" type="text" aria-describedby="basic-addon1" placeholder="Todo" v-model="newTodo" v-on:keyup.enter="addTodo"><br>
    </div>
  </div>
</template>

<script>
  const todoStorage = {
    fetch() { // 가져오는 작업(JSON -> object 리턴)
      return JSON.parse(localStorage.getItem('vue-todos') || "[]")
    },
    set(todos) { // 로컬스토리지에 저장하는 작업 (object -> JSON)
      return localStorage.setItem('vue-todos', JSON.stringify(todos))
    }
  }

  export default {
    name : "TodoList",
    props: {}, // 하위 컴포넌트로 데이터 전송
    data: function () {
      return {
        time: '',
        color: 'pink',
        font: '20px',
        headfont: '50px',
        status: 'all', // 'activate' (false) , 'completed' (true)
        newTodo: '',
        logo: 'data:image/png;base64,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',
        todos: []
      }
    },
    methods: {
      toggleCompleted: function (todo) {
        todo.completed = !todo.completed
      },
      addTodo: function () {
        this.todos.push({
          id: Date.now(),
          content: `${this.newTodo}`,
          completed: false
        })
        this.newTodo = ''
      },
      allCompleted: function () {
        for (todo of this.todos) {
          todo.completed = true
        }
      },
      clearCompleted() {
        this.todos = this.todos.filter(todo => {
          return !todo.completed
        })
      },
      updateTime() {
        const date = new Date()
        this.time = `${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`
      }
    },
    computed: {
      todosBystatus() {
        // this.status 1) 'active'
        if (this.status === 'active') {
          return this.todos.filter(todo => !todo.completed)
          // 2) complete
        } else if (this.status === 'complete') {
          return this.todos.filter(todo => todo.completed)
          // else all
        } else {
          return this.todos
        }
      }
    },
    watch: { // 특정 data의 변경을 추적, 반응
      todos: { // todos 를 바라봐!
        handler: function () {
          todoStorage.set(this.todos)
        },
        deep: true // 원소 자체의 변경 뿐만 아니라, 하위 원소의 변경까지 추적
      }
    },
    mounted: function () { // vue 시작되는 시점
      this.updateTime()
      this.$options.myInterval = setInterval(this.updateTime, 1000) // 현재시간
      this.todos = todoStorage.fetch()
    },
    beforeDestory: function () {
      clearInterval(this.$options.myInterval)
    }
  }
</script>

<style lang="">
  /* li {
    color:blue;
} */
</style>