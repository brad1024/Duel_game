
function sumOfObj(obj) {
  				return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
			} //sum of object




// outter only use mission_start and mission check

var mission = [
{
	id:10000,
	preneed_id:[],
	mission_start:(player,enemy)=>{
		player.remaining = 3;
	},
	mission_check:(player,enemy)=>{

		
		if(player.action.basic == "def"){ //action == defend

			player.remaining-=1;
			if(player.remaining==0){
					return mission[0].mission_success(player,enemy);

			}
		}

		return "ongoing";
				
	},
	mission_fail:(player,enemy)=>{ // when violate the rule, or *discard* 
		player.remaining=0; 
		player.mission=-1; //mssion remove
		return "fail";
	},
	mission_success:(player,enemy)=>{
		player.damageNoDef.spike+=1;
		player.remining=0;
		player.mission=-1; //mission remove 
		player.nextMissionAvailable[0] = 1;
		return "success";
	},
},
{
	id:10001,
	preneed_id:[10000],
	mission_start:(player,enemy)=>{
		player.remaining = 3;
	},
	mission_check:(player,enemy)=>{
		
		
		player.remaining-=player.damageNoDef["spike"] ;
		if(player.remaining<= 0){
			return mission[1].mission_success(player,enemy);
		}


		return "ongoing";
	},
	mission_fail:(player,enemy)=>{ // when violate the rule, or *discard* 
		player.remaining=0; 
		player.mission=-1; //mission remove
		return "fail";
	},
	mission_success:(player,enemy)=>{
		player.damageNoDef.spike+=1;
		player.mission=-1; //mission remove
		player.remining=0; 
		player.nextMissionAvailable[0] = -1;
		return "success";
	},
},
{
	id:10010,
	preneed_id:[],
	mission_start:(player,enemy)=>{
		player.remaining = 3;
	},
	mission_check:(player,enemy)=>{
		
		
		if(player.action.basic=="def"){ //action == defend
			player.remaining-=1;
			if(player.remaining==0){
				return mission[2].mission_success(player,enemy);
			}
		}
			
		return "ongoing";
	
	},
	mission_fail:(player,enemy)=>{ // when violate the rule, or *discard* 
		player.remaining=0; 
		player.mission=-1; //mission remove
		return "fail";
	},
	mission_success:(player,enemy)=>{
		player.def+=1;
		player.mission=-1; //mission remove 
		player.remining=0;
		player.nextMissionAvailable[1] = 1;
		return "success";
	},
},
{
	id:10011,
	preneed_id:[10010],
	mission_start:(player,enemy)=>{
		player.remaining = 3;
	},
	mission_check:(player,enemy)=>{
	
			if(player.remaining==3){
				if(player.action.basic=="def" ){ //action == defend
					player.remaining-=1;
				}
				else{
					return mission[3].mission_fail(player,enemy);
				}
			}
			else{
				if(player.action.basic=="def" && player.prevAction == "def"){ //action == defend
					player.remaining-=1;
					if(player.remaining==0){
						return mission[3].mission_success(player,enemy);
					}
				}
				else{
					return mission[3].mission_fail(player,enemy);
				}
			}
		
			return "ongoing";
	},
	mission_fail:(player,enemy)=>{ // when violate the rule, or *discard* 
		player.remaining=0; 
		player.mission=-1; //mission remove
		return "fail";
	},
	mission_success:(player,enemy)=>{
		player.def+=2;
		player.mission=-1; //mission remove 
		player.remining=0;
		player.nextMissionAvailable[1] = 2;
		return "success";
	},
},
{
	id:10012,
	preneed_id:[10011],
	mission_start:(player,enemy)=>{
		player.remaining = 3;
	},
	mission_check:(player,enemy)=>{
			
			if (sumOfObj(player.takenDamage)>0){
				return mission[4].mission_fail(player,enemy);
			}

			else{
				player.remaining-=1;
				if(player.remaining ==0){
					return mission[4].mission_success(player,enemy);
				}
			}
		
			return "ongoing";
	},
	mission_fail:(player,enemy)=>{ // when violate the rule, or *discard* 
		player.remaining=0; 
		player.mission=-1; //mission remove
		return "fail";
	},
	mission_success:(player,enemy)=>{
		player.def+=3;
		player.mission=-1; //mission remove 
		player.remining=0;
		player.nextMissionAvailable[1] = -1;
		return "success";
	},
},
{
	id:10020,
	preneed_id:[],
	mission_start:(player,enemy)=>{
		player.remaining = 3;
	},
	mission_check:(player,enemy)=>{
		
		if(player.action.basic=="atk"){ //action == attack
			player.remaining-=1;
			if(player.remaining==0){
				return mission[5].mission_success(player,enemy);
			}
		}
			
		return "ongoing";
	
	},
	mission_fail:(player,enemy)=>{ // when violate the rule, or *discard* 
		player.remaining=0; 
		player.mission=-1; //mission remove
		return "fail";
	},
	mission_success:(player,enemy)=>{
		player.atk+=1;
		player.mission=-1; //mission remove 
		player.remaining=0;
		player.nextMissionAvailable[2] = 1;
		return "success";
	},
},
{
	id:10021,
	preneed_id:[10020],
	mission_start:(player,enemy)=>{
		player.remaining = 3;
	},
	mission_check:(player,enemy)=>{
	
			if(player.remaining==3){
				if(player.action.basic=="atk" ){ //action == defend
					player.remaining-=1;
				}
				else{
					return mission[6].mission_fail(player,enemy);
				}
			}
			else{
				if(player.action.basic=="atk" && player.prevAction =="atk"){ //action == defend
					player.remaining-=1;
					if(player.remaining==0){
						return mission[6].mission_success(player,enemy);
					}
				}
				else{
					return mission[6].mission_fail(player,enemy);
				}
			}
		
			return "ongoing";
	},
	mission_fail:(player,enemy)=>{ // when violate the rule, or *discard* 
		player.remaining=0; 
		player.mission=-1; //mission remove
		return "fail";
	},
	mission_success:(player,enemy)=>{
		player.atk+=2;
		player.mission=-1; //mission remove 
		player.remaining=0;
		player.nextMissionAvailable[2] = 2;
		return "success";
	},
},
{
	id:10030,
	preneed_id:[],
	mission_start:(player,enemy)=>{
		player.remaining = 3;
	},
	mission_check:(player,enemy)=>{
		dmg=sumOfObj(player.takenDamage);
		
		player.remaining-=dmg;
		

		if(player.remaining <= 0){
			return mission[7].mission_success(player,enemy);
		}
	
			
		return "ongoing";
	
	},
	mission_fail:(player,enemy)=>{ // when violate the rule, or *discard* 
		player.remaining=0; 
		player.mission=-1; //mission remove
		return "fail";
	},
	mission_success:(player,enemy)=>{
		player.maxHp+=5;
		player.mission=-1; //mission remove 
		player.remaining=0;
		player.nextMissionAvailable[3] = 1;
		return "success";
	},
},
{
	id:10031,
	preneed_id:[10030],
	mission_start:(player,enemy)=>{
		player.remaining = 5;
	},
	mission_check:(player,enemy)=>{
		dmg=sumOfObj(player.takenDamage);
		
		player.remaining-=dmg;
		

		if(player.remaining <= 0){
			return mission[8].mission_success(player,enemy);
		}
	
			
		return "ongoing";
	
	},
	mission_fail:(player,enemy)=>{ // when violate the rule, or *discard* 
		player.remaining=0; 
		player.mission=-1; //mission remove
		return "fail";
	},
	mission_success:(player,enemy)=>{
		player.maxHp+=10;
		player.mission=-1; //mission remove 
		player.remaining=0;
		player.nextMissionAvailable[3] = -1;
		return "success";
	},
},
{
	id:10040,
	preneed_id:[],
	mission_start:(player,enemy)=>{
		player.remaining = 2;
	},
	mission_check:(player,enemy)=>{
	    if (player.isCritical == true){
	    	player.remaining-=1;
	    	if(player.remaining==0){
	    		return mission[9].mission_success(player,enemy);
	    	}
	    }
			
		return "ongoing";
	
	},
	mission_fail:(player,enemy)=>{ // when violate the rule, or *discard* 
		player.remaining=0; 
		player.mission=-1; //mission remove
		return "fail";
	},
	mission_success:(player,enemy)=>{
		player.crit_rate+=0.1;
		player.mission=-1; //mission remove 
		player.remaining=0;
		player.nextMissionAvailable[4] = 1;
		return "success";
	},
},
{
	id:10041,
	preneed_id:[10040],
	mission_start:(player,enemy)=>{
		player.remaining = 4;
	},
	mission_check:(player,enemy)=>{
	    if (player.isCritical == true ){
	    	player.remaining-=1;
	    	if(player.remaining==0){
	    		return mission[10].mission_success(player,enemy);
	    	}
	    }
			
		return "ongoing";
	
	},
	mission_fail:(player,enemy)=>{ // when violate the rule, or *discard* 
		player.remaining=0; 
		player.mission=-1; //mission remove
		return "fail";
	},
	mission_success:(player,enemy)=>{
		player.crit_rate+=0.2;
		player.mission=-1; //mission remove 
		player.remaining=0;
		player.nextMissionAvailable[4] = -1;
		return "success";
	},
},
{
	id:10022,
	preneed_id:[10021],
	mission_start:(player,enemy)=>{
		player.remaining = 4;
	},
	mission_check:(player,enemy)=>{
	
			if(player.remaining==4){
				if(player.action.basic=="atk" ){ //action == defend
					player.remaining-=1;
				}
				else{
					return mission[11].mission_fail(player,enemy);
				}
			}
			else{
				if(player.action.basic=="atk" && player.prevAction =="atk"){ //action == defend
					player.remaining-=1;
					if(player.remaining==0){
						return mission[11].mission_success(player,enemy);
					}
				}
				else{
					return mission[11].mission_fail(player,enemy);
				}
			}
		
			return "ongoing";
	},
	mission_fail:(player,enemy)=>{ // when violate the rule, or *discard* 
		player.remaining=0; 
		player.mission=-1; //mission remove
		return "fail";
	},
	mission_success:(player,enemy)=>{
		player.atk+=3;
		player.mission=-1; //mission remove 
		player.remining=0;
		player.nextMissionAvailable[2] = -1;
		return "success";
	},
},
{
	id:10050,
	preneed_id:[],
	originMaxHp:0,
	mission_start:(player,enemy)=>{
		player.remaining = 3;
		mission[12].originMaxHp=player.maxHp;
		player.maxHp = 5;
		player.hp=5;

	},
	mission_check:(player,enemy)=>{
		player.remaining-=1;
		if(player.remaining==0){
			return mission[12].mission_success(player,enemy);
		}
		return "ongoing";
	
	},
	mission_fail:(player,enemy)=>{ // when violate the rule, or *discard* 
		player.maxHp=mission[12].originMaxHp; 
		player.mission=-1;
		player.remining=0;
		return "fail";
	},
	mission_success:(player,enemy)=>{
		player.maxHp=mission[12].originMaxHp+5; 
		player.hp+=5;
		player.mission=-1; //mission remove 
		player.remining=0;
		return "success";
	},
},
]

module.exports = mission;