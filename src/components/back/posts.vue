<template>
    <div class="wrapper">
        <p>所有文章</p>
        <article-content @addPage="nextPage" @dropPage="prePage" />
        <router-link :to="{name: 'editor'}" class="addPost" tag="button">
            <span>添加文章</span>
        </router-link>
    </div>
</template>

<script>
    import {
        mapActions,
        mapState,
mapMutations
    } from 'vuex'
    import ArticleContent from './component/ArticleContent'
    export default {
        data() {
            return {
                pageNo: 1
            }
        },
        created() {
            this.set_all_articles([])
            this.getAllArticles({
                pageNo: this.pageNo,
            })
        },
        methods: {
            ...mapMutations(['set_all_articles']),
            ...mapActions(['getAllArticles']),
            nextPage() {
                this.pageNo++
                    this.getAllArticles({
                        pageNo: this.pageNo,
                    })
            },
            prePage() {
                this.pageNo--
                    this.getAllArticles({
                        pageNo: this.pageNo
                    })
            }
        },
        computed: {
            ...mapState(['articles'])
        },
        components: {
            ArticleContent
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .wrapper {
        position: relative;
        padding-top: 0.625rem;
        /*height: 35.625rem;*/
        color: #ffffff;
        p {
            border-bottom: 0.1875rem double rgb(129, 216, 208);
            width: 12.5rem;
            font-size: 1.875rem;
            margin: 0 auto 2.5rem;
            padding-bottom: 0.625rem;
            text-align: center;
        }
        .addPost {
            position: fixed;
            bottom: 1.25rem;
            right: 1.25rem;
        }
    }
    @media screen and (max-width: 440px) {
        .wrapper {
            padding-top: 2rem !important;
            margin-bottom: 4rem;
            .addPost {
                position: absolute !important;
                bottom: -3rem !important;
            }
        }
    }
</style>
