<template>
  <!-- 底部快速入口 -->
		<div class="vf-footer border-top">
			<ul>
				<li>
					<a href="javascript:void(0);" @click="routerCon"><svg class="icon login-icon" aria-hidden="true" v-if="type=='ch'"><use xlink:href="#icon-eye-color"></use></svg><svg class="icon login-icon" aria-hidden="true" v-else><use xlink:href="#icon-eye"></use></svg>观点</a>
				</li>
				<li>
					<a href="javascript:void(0);" @click="routerMy"><svg class="icon login-icon" aria-hidden="true" v-if="type=='my'"><use xlink:href="#icon-user-color"></use></svg><svg class="icon login-icon" aria-hidden="true" v-else><use xlink:href="#icon-user"></use></svg>我的</a>
				</li>
			</ul>
		</div>
</template>

<script>
export default {
  name: 'Footer',
  props:['type'],
  data () {
    return {

      msg: ''
    }
  },
  methods:{
    routerMy:function () {


      this.$router.push({name:'UserCenter'})

    },
    routerCon:function () {

      this.$router.push({name:'Index'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
