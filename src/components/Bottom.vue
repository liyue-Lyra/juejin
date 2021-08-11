<template>
    <transition name="bottom" >
    <div class="Bottom" v-show="showBottom">
        <div class="hot">
            <a href="javascript:;" @click="bottomState='hot'" :class="bottomState==='hot' ? 'active' : ''">
                <i class="iconfont icon-icon_remen-xian"></i><br/>
                热门
            </a>
        </div>
        
        <div class="new">
            <a href="javascript:;" @click="bottomState='new'" :class="bottomState==='new' ? 'active' : ''">
                <i class="iconfont icon-icon-test"></i><br/>
                最新
            </a>
        </div>

        <div class="history">
            <a href="javascript:;" @click="bottomState='history'" :class="bottomState==='history' ? 'active' : ''">
                <i class="iconfont icon-lishijilu"></i><br/>
                历史
            </a>
        </div>
    </div>
    </transition>

</template>

<script>
export default {
    name: "Bottom",
    components: {},
    data() {
        return {
            bottomState:'hot',
            showBottom:true,
            oldValue:''
        };
    },

    activated(){
        this.$bus.$on('showBottom',showBottom=>this.showBottom=showBottom)
    },

    destroyed(){
        this.$bus.$off('showBottom')
    },

    methods: {},

    watch:{
        bottomState:{
            handler(newValue,oldValue){
                if(newValue===oldValue) return
                else{
                    if(newValue!=='history') {
                        if(oldValue==='history'){
                           this.$router.replace({name: 'articleListPage'})
                           if(newValue!==this.oldValue) this.$bus.$emit('articleSortBy',newValue)
                        }else{
                            this.$bus.$emit('articleSortBy',newValue)
                              
                        }
                        this.$bus.$emit('changeBottomState',newValue)
                    }else{
                        this.oldValue=oldValue
                        this.$router.replace({name: 'historyPage'})
                    }
                }
                
            }
        }
    }
};
</script>

<style scoped>

 

.Bottom.bottom-enter,.Bottom.bottom-leave-to{
      transform: translateY(50px);
  }
  .Bottom.bottom-enter-active,.Bottom.bottom-leave-active{
      transition: 0.5s linear;
  }

  .Bottom.bottom-enter-to,.Bottom.bottom-leave{
      transform: translateY(0);
  }

.Bottom{
    width: 100%;
    height: 50px;
    /* line-height: 25px; */
    display: flex;
    flex: initial;
    background-color: white;
    justify-content:space-around; /* 空白分布到元素两侧 */
    position:fixed; 
    bottom:0;
    z-index: 10;
    text-align:center;
    border-top: 1px solid #d0d2d4;
}

 a{
    height: 100%;
    width: 100px;
    background-color: white;
    
    color: #71777c;
    text-decoration:none;
    font-size: 13px;
}

.Bottom .active{
        color: #007fff;
    }

.hot,.new,.history{
    margin:auto 0;
}

/* 热门 */
.icon-icon_remen-xian{
    font-size: 28px;
}

/* 历史记录、最新 */

.icon-icon-test{
    font-size: 29px;
}

.icon-lishijilu{
    font-size: 27px;
}
</style>