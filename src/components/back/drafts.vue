<template>
    <div class="container">
        <p>所有草稿</p>
        <article-content @addPage="nextPage" @dropPage="prePage" />
        <router-link :to="{name: 'editor'}" class="addPost" tag="button">
            <span>添加草稿</span>
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
                page: 1
            }
        },
        created() {
            this.set_all_articles([])
            this.getAllDrafts({
                pageNo: this.page,
                // limit: 8
            })
        },
        methods: {
            ...mapMutations(['set_all_articles']),
            ...mapActions(['getAllDrafts']),
            nextPage() {
                this.page++
                    this.getAllDrafts({
                        pageNo: this.page,
                    })
            },
            prePage() {
                if (!(this.page - 1)) {
                    alert('已经到第一页咯')
                } else {
                    this.page--
                        this.getAllDrafts({
                            pageNo: this.page,
                        })
                }
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
    .container {
        padding-top: 0.625rem;
        color: #ffffff;
        position: relative;
        P {
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
        .container {
            padding-top: 2rem !important;
            margin-bottom: 3rem;
            .addPost {
                position: absolute;
                bottom: -3rem;
            }
        }
    }
</style>
