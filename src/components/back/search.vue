<template>
    <div class="container">
        <div class="search">
            <input v-model="text" type="text" :placeholder="tip" onfocus="this.placeholder=''" @keydown.enter="searchArticles({key: text, page: page})">
            <i class="iconfont icon-search" @click="searchArticles({key: text, page: page})" />
        </div>
        <!-- <div class="searchString">
            搜索匹配：
            <label for="title">
            <input
              id="title"
              v-model="picked"
              type="radio"
              value="title"
            >标题
          </label>
            <label for="tags">
            <input
              id="tags"
              v-model="picked"
              type="radio"
              value="tags"
            >标签
          </label>
            <label for="date">
            <input
              id="date"
              v-model="picked"
              type="radio"
              value="date"
            >日期
          </label>
        </div> -->
        <p>搜索结果</p>
        <article-content @addPage="nextPage" @dropPage="prePage" />
    </div>
</template>

<script>
    import ArticleContent from './component/ArticleContent'
    import {
        mapActions,
        mapMutations
    } from 'vuex'
    export default {
        data() {
            return {
                picked: 'title',
                text: '',
                page: 1,
                tip: '请输入标题、内容或日期'
            }
        },
        created() {
            this.set_all_articles({})
            this.searchArticles({
                key: this.text,
                pageNo: this.page
            })
        },
        methods: {
            ...mapActions(['searchArticles']),
            ...mapMutations(['set_all_articles']),
            nextPage() {
                this.page++
                this.searchArticles({
                    // key: this.picked,
                    key: this.text,
                    pageNo: this.page
                })
            },
            prePage() {
                if (!(this.page - 1)) {
                    alert('已经到第一页咯')
                } else {
                    this.page--
                    this.searchArticles({
                        // key: this.picked,
                        key: this.text,
                        pageNo: this.page
                    })
                }
            }
        },
        components: {
            ArticleContent
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .container {
        text-align: center;
        padding-bottom: 2rem;
        .search {
            margin-right: -2.8125rem;
            input {
                width: 28.125rem;
                margin: 1.25rem auto 0.625rem;
                height: 2.8125rem;
                font-size: 1.25rem;
                border: 0.125rem solid rgb(129, 216, 208);
                border-radius: 1.875rem;
                outline: none;
                text-align: center;
                color: #ffffff;
                background: transparent;
            }
            i {
                position: relative;
                left: -3.4375rem;
                top: 0.5625rem;
                color: rgb(169, 169, 169);
                font-size: 2.5rem;
                cursor: pointer;
                &:hover {
                    color: rgb(129, 216, 208);
                }
            }
        }
        .searchString {
            color: #fff;
            font-size: 1.25rem;
            margin-bottom: 4.375rem;
            input {
                outline: none;
                cursor: pointer;
                margin-right: 0.625rem;
            }
            label {
                margin-right: 1.25rem;
                cursor: pointer;
            }
        }
        p {
            border-bottom: 0.1875rem double rgb(129, 216, 208);
            width: 12.5rem;
            font-size: 1.875rem;
            margin: 0 auto 2.5rem;
            padding-bottom: 0.625rem;
            color: #ffffff;
        }
    }
    @media screen and (max-width: 440px) {
        .search {
            input {
                width: 80% !important;
            }
        }
    }
</style>
