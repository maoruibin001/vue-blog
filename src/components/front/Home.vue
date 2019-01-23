<template>
    <div class="container">
        <section class="newBlog">
            <a href="#lastPost" class="title animated bounceIn">
                <p id="lastPost" class="headline">
                    最近更新
                </p>
            </a>
            <div class="posts animated fadeIn">
                <ReducedArticles direction='row' :headlineOpts='headlineOpts' :articles='reducedArticles' @loadMore='loadMore'></ReducedArticles>
            </div>
        </section>
    </div>
</template>

<script>
    import {
        mapMutations,
        mapActions,
        mapGetters
    } from 'vuex'
    import ReducedArticles from './component/ReduceArticle'
    export default {
        components: {
            ReducedArticles
        },
        data() {
            return {
                subject: '',
                address: '',
                content: '',
                sendFlag: false,
                headlineOpts: {
                    content: 'Welcome to my blog',
                    animation: 'animated bounceIn'
                }
            }
        },
        created() {
            this.getAllArticles({
                page: 1
            })
        },
        computed: {
            ...mapGetters(['reducedArticles'])
        },
        methods: {
            ...mapMutations(['set_headline', 'set_dialog']),
            ...mapActions(['getAllArticles', 'sendMail']),
            send() {
                const re = /^[\w_-]+@[\w_-]+\.[\w\\.]+$/
                if (!this.subject || !this.content) {
                    this.set_dialog({
                        info: '还有选项没填(⊙o⊙)？',
                        hasTwoBtn: false,
                        show: true
                    })
                    return
                } else if (!re.test(this.address)) {
                    this.set_dialog({
                        info: '请正确填写邮箱地址',
                        hasTwoBtn: false,
                        show: true
                    })
                    return
                }
                this.sendFlag = true
                this.sendMail({
                    subject: this.subject,
                    address: this.address,
                    content: this.content
                }).then(() => {
                    this.subject = ''
                    this.content = ''
                    this.address = ''
                    this.sendFlag = false
                }).catch(() => {
                    this.sendFlag = false
                    this.set_dialog({
                        info: 'sorry, 邮件发送失败，请重新发送',
                        hasTwoBtn: false,
                        show: true
                    })
                })
            },
            loadMore() {

            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .container {
        background: rgba(55, 57, 65, 0.2);
        .newBlog {
            min-height: 43.75rem;
            .title {
                margin-bottom: 4.75rem;
                p {
                    padding-top: 2.8125rem;
                    width: 13rem;
                }
            }
            .posts {
                margin-top: 1rem; // .flex {
                //     color: #fff;
                //     display: flex;
                //     flex-wrap: wrap;
                //     justify-content: center;
                //     padding-left: 1rem;
                //     padding-right: 1rem;
                // }
            }
        }
        .contact {
            background: rgba(55, 57, 65, 0.2);
            padding: 0 1rem;
            padding-bottom: 2rem;
            min-height: 30rem;
            .title {
                color: white;
                margin-bottom: 3.75rem;
                p {
                    padding-top: 2.8125rem;
                    width: 13rem;
                }
            }
            .email {
                margin: 3.125rem auto 0;
                width: 40%;
                input {
                    color: #ffffff;
                    font-size: 1.125rem;
                    border: 0.125rem solid rgb(129, 216, 208);
                    width: 70%;
                    height: 1.5625rem;
                    margin-bottom: 1.25rem;
                    display: block;
                    background: transparent;
                }
                textarea {
                    color: #ffffff;
                    font-size: 1.125rem;
                    border: 0.125rem solid rgb(129, 216, 208);
                    width: 100%;
                    height: 15rem;
                    resize: none;
                    background: transparent;
                    padding-top: 0.5rem;
                    font-family: Georgia, "Microsoft YaHei", "微软雅黑", STXihei, "华文细黑", serif;
                }
                .sendEmail {
                    width: 6.25rem;
                    margin-top: 0.625rem;
                    margin-left: calc(100% - 6.25rem);
                }
            }
        }
    }
    p.headline {
        padding-top: 4.375rem;
        margin: 0 auto 2.25rem;
        text-align: center;
        color: #fff;
        font-size: 2rem;
        padding-bottom: 1.25rem;
        border-bottom: 0.3125rem double rgb(129, 216, 208);
    }
    .commentNumber {
        color: #ffffff;
        font-size: 1.25rem;
        i {
            font-size: 1.25rem;
            margin-right: 0.3125rem;
        }
    }
    @media screen and (max-width: 440px) {
        // .oneArticle {
        //     flex-grow: 1;
        //     margin-left: 0 !important;
        //     margin-right: 0 !important;
        // }
        .email {
            width: 100% !important;
        }
    }
</style>
