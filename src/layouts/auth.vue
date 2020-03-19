<template>
    <div>

    {{key}}

    </div>
</template>
<script>
export default {
    data(){
        return{
            key: localStorage.auth_token
        }
    },
    created(){

    }
}
</script>
