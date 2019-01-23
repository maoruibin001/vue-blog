<template>
    <div class="row" v-if='direction === "row"'>
        <div v-for="(article, index) in articles" :key="index" class="oneArticle">
            <div class="option">
                <time>{{ article.date | toDate }}</time>
                <span class="commentNumber" @click='toComment({id: article.aid, index: index, page: 1})'>
                                                    <i class="iconfont icon-huifu" />{{ article.comment_n }}
                                                  </span>
            </div>
            <router-link :to="{name: 'article', params: {id: article.aid, index: index, page: 1}, hash: '#article'}" tag="p" exact class="title_1">
                {{ article.title }}
            </router-link>
            <p class="content">
                {{ article.content }}
            </p>
            <router-link :to="{name: 'article', params: {id: article.aid, index: index, page: 1}, hash: '#article'}" tag="button" exact>
                <span>Read More</span>
            </router-link>
        </div>
    </div>
    <div v-else class="col">
        <div v-for="(article, index) in articles" id="article" class="article" :key="index">
            <h2>{{ article.title }}</h2>
            <time><i class="iconfont icon-shijian" />{{ article.date | toDate }}</time>
            <span class="articleTag">
                        <i class="iconfont icon-label" />{{ article.tags | toTag }}
                      </span>
            <span class="commentNumber">
                        <i class="iconfont icon-huifu" />{{ article.comment_n }}
                      </span>
            <p>{{ article.content }}</p>
            <router-link :to="{name: 'article', params: {id: article.aid, index: index, page: page}, hash: '#article'}" tag="button" exact>
                <span>Continue reading</span>
            </router-link>
        </div>
        <spinner v-show="loadMore" class="loading" />
        <p v-if="!loadMore" v-show="!noMore" class="noMore animated fadeIn">
            下拉加载更多
        </p>
        <p v-if="noMore" class="noMore animated fadeIn">
            没啦没啦，别扯了
        </p>
    </div>
</template>

<script>
    import {
        mapActions,
        mapState,
        mapMutations,
        mapGetters
    } from 'vuex'
    import spinner from '../../share/spinner'
    const OFFSETBOTTOM = 100;
    export default {
        props: {
            page: {
                type: Number,
                default: 1
            },
            direction: {
                type: String,
                default: 'row'
            },
            articles: {
                type: Array,
                default: () => []
            },
            headlineOpts: {
                type: Object,
                default: () => {}
            }
        },
        components: {
            spinner
        },
        data() {
            return {}
        },
        create() {
            this.set_headline(headlineOpts)
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
        },
        computed: {
            ...mapState(['loadMore', 'moreArticle', 'isLoading', 'noMore']),
        },
        beforeRouteLeave(to, from, next) {
            window.removeEventListener('scroll', this.handleScroll)
            next()
        },
        methods: {
            ...mapActions(['getAllArticles', 'searczhArticles']),
            ...mapMutations(['set_headline']),
            toComment(params) {
                this.$router.push({
                    name: 'article',
                    params,
                    hash: '#comment'
                })
            },
            handleScroll() {
                if (!this.isLoading) {
                    const body = document.body
                    const totalHeight = body.scrollHeight
                    const scrollTop = document.documentElement.scrollTop
                    const clientHeight = window.innerHeight
                    var a = this.moreArticle;
                    console.log('scrollTop: ', scrollTop)
                    console.log(totalHeight - scrollTop - clientHeight);
                    if (totalHeight - scrollTop - clientHeight === OFFSETBOTTOM && this.moreArticle) {
                        this.$emit('loadMore')
                        // this.searchArticles({
                        //     key: 'title',
                        //     value: this.$route.params.text,
                        //     add: true,
                        //     page: ++this.page
                        // })
                    }
                    if (!this.moreArticle) {
                        this.page = 1
                    }
                }
            }
        },
    }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
    .row {
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding-left: 1rem;
        padding-right: 1rem;
        div.oneArticle {
            flex-shrink: 1;
            width: 15rem;
            border: 0.1875rem solid rgb(129, 216, 208);
            padding: 0 2rem 1.25rem;
            margin: 0 2rem 4rem 2rem;
            .option {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                padding-top: 1rem;
                time {
                    flex-shrink: 1;
                    width: 16rem;
                    padding-bottom: 1rem;
                    display: inline-block;
                    font-size: 1.25rem;
                }
            }
            p:nth-child(2) {
                font-size: 1.5rem;
                font-weight: bold;
                padding-top: 1.25rem;
                border-top: 0.125rem dashed rgb(129, 216, 208);
                &:hover {
                    color: rgb(0, 194, 169);
                    cursor: pointer;
                }
            }
            p:nth-child(3) {
                margin-top: 1.875rem;
            }
        }
    }
    .col {
        .article {
            color: #fff;
            width: 100%;
            border-bottom: 0.125rem solid rgb(129, 216, 208);
            h2 {
                color: rgb(129, 216, 208);
                margin-top: 1.875rem;
                margin-bottom: 1.25rem;
            }
            time {
                margin-top: 0.625rem;
                margin-right: 0.625rem;
            }
            p {
                white-space: pre-wrap;
                word-wrap: break-word;
                margin-top: 1.875rem;
                margin-bottom: 1.875rem;
            }
            button {
                width: 8.75rem;
                height: 2.5rem;
                line-height: 2.5rem;
                margin-bottom: 1.25rem;
                border-radius: 0.25rem;
                margin-left: calc(100% - 8.75rem);
            }
            .articleTag {
                margin-bottom: 1.875rem;
                margin-right: 0.625rem;
            }
            .commentNumber {
                color: #ffffff;
                i {
                    font-size: 1.125rem;
                    margin-right: 0.3125rem;
                }
            }
            i.icon-label,
            i.icon-shijian {
                color: #ffffff;
                font-size: 1.25rem;
                margin-right: 0.3125rem;
            }
        }
        p.noMore {
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            color: #ffffff;
            margin-top: 1.875rem;
            margin-bottom: 1.875rem;
            text-align: center;
        }
    }
    @media screen and (max-width: 440px) {
        .oneArticle {
            flex-grow: 1;
            margin-left: 0 !important;
            margin-right: 0 !important;
        }
    }
    @media screen and (max-width: 440px) {
        #search {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
        }
    }
</style>
