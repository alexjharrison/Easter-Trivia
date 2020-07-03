<template>
  <div>
    <h1>Create a game</h1>
    <b-form @submit.prevent="handleSubmit">
      <label for="game-author">Game Author</label>
      <b-form-input id="game-author" v-model="formData.author" required />
      <label for="name">Name of Question Set</label>
      <b-form-input id="name" v-model="formData.name" required />
      <question-wrapper
        v-for="(question, i) in formData.questions"
        :key="i"
        :question-number="i + 1"
        :question="question"
        @update="
          formData.questions.splice(i, 1, {
            ...formData.questions[i],
            ...$event
          })
        "
        @update-pic="formData.images = { ...formData.images, ...$event }"
      ></question-wrapper>
      <b-button class="mt-4" type="submit" @click="handleSubmit"
        >Save Question List</b-button
      >
    </b-form>
  </div>
</template>

<script>
import QuestionWrapper from '@/components/create/QuestionWrapper'
export default {
  components: { QuestionWrapper },
  data() {
    return {
      formData: {
        author: '',
        name: '',
        images: {},
        questions: new Array(21).fill({})
      }
    }
  },
  methods: {
    createFormData() {
      const data = new FormData()
      for (const item in this.formData.images) {
        data.append(item, this.formData.images[item])
      }
      data.append('author', this.formData.author)
      data.append('name', this.formData.name)
      this.formData.questions.map((question, i) => {
        for (const key in question) {
          const value = question[key]
          if (!Array.isArray(value))
            data.append(`questions[${i}][${key}]`, value)
          else {
            value.map((answer, j) => {
              data.append(`questions[${i}][answers][${j}]`, answer)
            })
          }
        }
      })
      return data
    },
    handleSubmit() {
      const data = this.createFormData()
      this.$axios.$post('/api/templates', data)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  label {
    margin-top: 10px;
  }
  input {
    max-width: 350px;
  }
}
</style>
