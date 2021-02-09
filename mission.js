//function canAcceptMission(player,mission){
// input :player object , mission object
// output: boolean , determine player can accept this mission or not
	//let checker = (arr, target) => target.every(v => arr.includes(v));
// check all target ele in arr ? 
	//return checker(player.doneMission,mission.preneed_id);

//}
function sumOfObj(obj) {
  				return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
			} //sum of object



// outter only use mission_start and mission check

var mission = [
{
	id:0,
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
		player.spike+=1;
		player.mission=-1; //mission remove 
		return "success";
	},
},
{
	id:1,
	preneed_id:[0],
	mission_start:(player,enemy)=>{
		player.remaining = 3;
	},
	mission_check:(player,enemy)=>{
		
		
		player.remaining-=player.damageNoDef["spike"] ;
		if(player.remaining<0){
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
		player.spike+=1;
		player.mission=-1; //mission remove 
		return "success";
	},
},
{
	id:2,
	preneed_id:[],
	mission_start:(player,enemy)=>{
		player.remaining = 3;
	},
	mission_check:(player,enemy)=>{
		
		
		if(player.action=="def"){ //action == defend
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
		return "success";
	},
},
{
	id:3,
	preneed_id:[2],
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
				if(player.action.basic=="def" && player.prevAction =="def"){ //action == defend
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
		return "success";
	},
},
{
	id:4,
	preneed_id:[3],
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
		player.def+=2;
		player.mission=-1; //mission remove 
		return "success";
	},
},
]

