<template>
    <div>
        <h2>{{msg}}</h2>
        <hr>
        <h3>{{$store.state.count}}-{{count}}</h3>
        <p>
            <button @click="$store.commit('add',10)">+</button>
            <button @click="reduce">-</button>
        </p>
        <p>
            <button @click="addAction">+</button>
            <button @click="reduceAction">-</button>
        </p>
    </div>
</template>
<script>
import store from '../../../vuex/store';
import {mapState, mapActions} from 'vuex'
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'

export default {
    data(){
        return{
            msg:'hello Vuex'
        }
    },
    computed:{
        ...mapState(['count']),
        count(){
           return  this.$store.getters.count;
        },
        ...mapGetters(['count'])
    },
    
    methods:{
        ...mapMutations(['add','reduce']),
        ...mapActions(['addAction','reduceAction'])
    },
    store
}
</script>
