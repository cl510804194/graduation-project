<template>
    <div>
        <div v-focus>{{num}}</div>
        <p><button @click="add">Add</button></p>
    </div>
</template>
<script>

export default {

    data(){
        return{
            num:10,
            color:'green'
        }
    },
    methods:{
        add:function(){
            this.num++
        }
    },
    directives:{

        focus:{
            bind:function(el,bindding){
                //console.log(bindding)
            },
            inserted:function(el){
                el.focus,
                console.log(el)
          
            }
        }
      
            
        
    }
}
</script>