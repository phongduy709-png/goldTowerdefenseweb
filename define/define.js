/**********************************************
 define.js

 서버에 위치 하면서 중요한 define을 정의 하는 곳임.
 가능하면 size를 적게 해야 함. 서버에서 로딩속도를 줄이기 위해

 SKB,KT 공통의 define을 사용함.
 http://211.253.26.47:8093/TOWERDEFENCE_COMMON/define/define.js

 ... 성능향상을 위해 생략함....
 20230130 SS,LG 100 stage open/ HCN pvp 통합시킴
 20230901 ywlee CDN을 위해 독일서버/한국서버 구분할수 있도록 수정함.
 **********************************************/
var DEFINE =
{
	BOSS_PVP_LIMIT_TIME	: 20 * 15,	//20251027_jhyu 보스전 pvp 제한시간 -> 20260806_jhyu 기획자 요청으로 60초에서 15초로 수정
	PVP_LIMIT_TIME		: 20 * 15,	//20260126_jhyu pvp 개편 제한시간 -> 20260806_jhyu 기획자 요청으로 60초에서 15초로 수정
	TERR_LIMIT_TIME		: 20 * 300,	//20260818_jhyu 길드 영지전 제한시간

	//INGAME_MAX_ENEMY_NUM : 2, //한판의 게임에서 나올수 있는 적군의 최대수량

	MONTH_MAX_PAYMENT		: 0,	//월구매한도 정의 (SKB는 30만원(고포류50만원),DLIVE의 경우 20만원 임, KT의 경우 50만원임, 시스템에서 해 주지만 그대로 사용함.) -- util_Global에서 플랫폼별로 정의함.
	
	MAP_MAX				: 20, //최고 몇개의 map이 있는가 MAP 전역배열을 잡기위함임.
	MAX_ROAD_ONE_MAP	: 10, //한개의 맵에 나오는 최고 ROAD의 수
	CONTINUE_NEED_RUBY	: 50, //이어하기에 사용될 루비

	USE_CANVAS : true, //canvas 테스트를 위해 true한다. true되면 적군만 우선 canvas로 그려 진다. 실제 서비스시에는 false할 예정임.
	MATH_PI_180 :  0.01745, //Math.PI/180 을 미리 계산해 두는 것임.

	USER_MAX_GONGJI	: 10,		//사용자가 최대 볼수 있는 공지 수, 그리고 봤던거 기억하는 공지 수 (공지 몇개 동시에 볼수 있나 관련)
	USERINFO_MAX_GONGJI		: 20,		//서버에 사용자가 최근에 본 공지 20개는 저장한다. ( STORAGE관련 )
	USER_MAX_STAGE	  : 220, //스테이지 모드가 얼마까지 있느냐? 넉넉잡아 200까지 있다고 하자.
	USER_MAX_LEVEL	  : 200, //사용자가 진행할 수 있는 최대 레벨 USER.level의 최대값.
	USER_LEVEL_FOR_2X : 5,	 //2배속 게임을 하기위한 사용자 레벨 조건
	SERVICE_MAX_STAGE : 80, //서비스 할수 있는 최대 스테이지

	HERO_MAX_LEVEL	  : 50, //영웅이 최대로 업그레이드할수 있는레벨은 50까지 이다.

	UNIT_MAX_LEVEL	: 5,	//20260126_jhyu 유닛 최대 레벨(별 개수)

	CASTLE_MAX_LEVEL : 5,	//20260724_jhyu 성 최대 레벨

	//20231123_ywlee 최초지급을 0 --> 엄청많이로 수정함. D1 리텐션을 잡기 위해 
	//20260409_jhyu 최초 지급 재화 수정
	USER_INIT_GOLD	: 500000,//1000000,	//최초 사용자에게 주어지는 골드
	USER_INIT_DIA	: 8000,//3000,		//최초 사용자에게 주어지는 다이아
	USER_INIT_RUBY	: 50,//50,			//최초 사용자에게 주어지는 루비
	USER_INIT_MAGIC : 1000,				//최초 사용자에게 주어지는 마력

	PVP_ENTERANCE_FEE: 10000,	//PVP추가 입장시 필요한 골드 //20230214_ywlee PVP입장료 2배 증가 5000 -> 10000
	PVP_ENTERANCE_RUBY: 20,	//제한된 PVP추가 입장시 필요한 루비
	PVP_ENTERANCE_MAGIC: 10,	//제한된 PVP추가 입장시 필요한 마력
	PVP_ENTERANCE_GOLD: 10000,	//제한된 PVP추가 입장시 필요한 골드

	GUILD_TERR_ENTRY_RUBY : 5,	//20260724_jhyu 길드 영지전 추가 입장 루비, php도 수정 필요

	PROOFTOP_ENTERANCE_FEE: 30000,	//증명의탑 입장료 골드 

	ATTRIBIUTE_RATE  : 0.4,		//속성에 따른 상호 상승작용을 몇퍼센트 할 것인가 이다. 1이면100, 0.3이면 30%이다. 0.4이면 40%이다.

	ALLY_DEATH_ALIVE_TICK_D : 20 * 10, //10초, D등급의 아군이 죽었을때 되살아 나는데 걸리는 시간 tick
	ALLY_DEATH_ALIVE_TICK_C : 20 * 9, //9초, C등급의 아군이 죽었을때 되살아 나는데 걸리는 시간 tick
	ALLY_DEATH_ALIVE_TICK_B : 20 * 8, //8초, B등급의 아군이 죽었을때 되살아 나는데 걸리는 시간 tick
	ALLY_DEATH_ALIVE_TICK_A : 20 * 7, //7초, A등급의 아군이 죽었을때 되살아 나는데 걸리는 시간 tick
	ALLY_DEATH_ALIVE_TICK_S : 20 * 6, //6초, S등급의 아군이 죽었을때 되살아 나는데 걸리는 시간 tick

	//goods에 대한 정의	
	MARKETSTORE_PASS 	: null, 	//패스권 구매 상점 - 돈(won)을 지불하고 패키지를 구매한다. 20260324_jhyu
	MARKETSTORE_PACKAGE	: null, //프리미엄패키지 - 돈(won)을 지불하고 패키지를 구매한다. //아래 DEFINE.goods()에서 정의 함.  
	MARKETSTORE_MAGIC 	: null, 	//마력 구매 상점 - 돈(won)을 지불하고 패키지를 구매한다. 20260324_jhyu
	MARKETSTORE_RUBY	: null, //루비 구매 상점 - 돈(won)을 지불하고 루비를 얻는다. //아래 DEFINE.goods()에서 정의 함. 
	MARKETSTORE_GOLD	: null, //골드 구매 상점 - ruby를 지불하고, gold를 얻는다.//아래 DEFINE.goods()에서 정의 함.
	MARKETSTORE_DIA		: null,	//다아아 구매 상점 - ruby를 지불하고, 다이아를 얻는다.//아래 DEFINE.goods()에서 정의 함.


	CHANGENAME_RUBY		: 100,	 //이름변경시 필요루비
	UPGRADEINIT_GOLD	: 50000, //업그레이드 초기화에 골드비용
	LEGENDCARD_SELL_SOUL_15 : 15,   //전설등급 카드 1장에 다이아 100개로 판매 가능 -> 20250306_twkim 영혼석 15개로 바꿈
	LEGENDCARD_SELL_SOUL_5  : 5,	//늑대 타워는 영혼석 5개준다

	//20220221_ywlee_타워레벨15에서5단계로변경
	TOWER_MAX_LEVEL : 5, //TOWER의 max level이 15 -> 5로변경되면서 추가 됨.

	//20230908_ywlee 추가함. define.js에는 제일일빠타로 추가되기 때문에 여기 정의한 것은 어디서든 확인할수 있음.
	// IFDEF_OPTION : "REL_ONLY", // 릴리즈 라고 정의 되었으면, 아래 주석 막고, 이거 주석풀면 개발자모드 접근못함.
	IFDEF_OPTION : "DEV_ONLY", //이거주석풀면 개발자모드 사용가능함.
	//20230920_개발자모드아닐시 디버그 멈추는거 때문에 lg 오류나서 일단 풀어두었다

	//20250401_jhyu 스테이지 시작할때 키입력 매크로를 사용해 몬스터 안나오게 하는 버그 수정위해 키입력을 딜레이 시킴
	STAGE_KEY_ENABLE_DELAY : 7000,

	//20260427_jhyu 선택 타워 10개로 확장
	SELECT_TOWER_CNT : 10,

	//20260609_jhyu 영웅 선택 10개로 확장
	SELECT_HERO_CNT : 10,

	ZINDEX :
	{
		GAME_BG					: 0, //게임 배경화면
		GAME_OBJECT				: 0, //0~720까지이며, object의 y값을 기준으로 한다.

		GAME_BG_ANI				: 1, //게임 배경화면
		GAME_BG_GUIDE			: 2, //guide_line(격자)
		//GAME_TOWER_AREA_MARK	: 3, //타워 설치 할 수 있다는 마크 //타워포커스보다 아래로 가야 해서 사용하지 않을것임. //사용안함. y좌표로 사용함.
		//GAME_TOWER_AREA_GUIDE	: 4, //타워 설치 할 수 있다는 guide //사용안함 y좌표로 함.

		GAME_BG_FILTER		: 3, //20220727_ywlee 증명의 탑 배경 필터 시도
											 
		GAME_PREDICT_ICON   : 1720, //예견 아이콘
		GAME_STAGE_TEXT		: 1721, //몇 스테이지 인지 보여준다. 우상단
		GAME_TIMER_IMG		: 1722, //20231102_twkim 게임 타이머 
		GAME_TIMER_TEXT		: 1723, 

		GAME_TOWER_FIRE			: 1750, //타워에서 발사되는 발사체

		GAME_TOP_INFO_ENEMY_BOARD	: 1752, //캐릭터 보여주기 위한 보드
		GAME_TOP_INFO_ENEMY_CHAR	: 1753, //캐릭터
		GAME_TOP_INFO_ENEMY_ATTR	: 1754, //속성
		GAME_TOP_INFO_ENEMY_SPECIAL	: 1755, //공중공격,매우빠름....		
		


		GAME_TOWER_AREA_NUMBER_FOCUS : 10,
		//GAME_TOWER_ANI			: 720, //타워애니 - D3 타워 눈 깜빡임등 --> 삭제, 이거하니깐 보스 위로 애니메이션 됨.
		GAME_TOWER_AREA_NUMBER	: 1801,
		GAME_TOWER_SELECT_BORAD	: 1804, //타워선택화면 배경에 깔아 주는 놈.
		GAME_TOWER_SELECT		: 1805,
		GAME_TOWER_SELECT_COOL	: 1806,
		GAME_TOWER_SELECT_FOCUS	: 1807,
		GAME_TOWER_SELECT_DIM	: 1808,

		GAME_TOWER_UPGRADE_BOARD: 1804,
		GAME_TOWER_UPGRADE		: 1805,
		GAME_TOWER_UPGRADE_FOCUS: 1807,
		GAME_TOWER_UPGRADE_DIM	: 1808,		 

		GAME_TOWER_AREA_ITEM	: 1810,

		//20220805_ywlee 93 stage에서 타워설치정보를 웨이브정보 위에 표시하기 위함임. : 아이템수량이 보이지 않아 내용수정함.
		GAME_BOTTOM_MENU		: 1730,//810,		
		GAME_BOTTOM_MENU_DIM	: 1731,//811, //쿨타임표기를 위한 딤 등
		GAME_BOTTOM_MENU_LOCK	: 1732,//812, //LOCK 이미지 보여 주기
		GAME_BOTTOM_MENU_FOCUS	: 1733,//813,
		GAME_BOTTOM_MENU_NUMBER	: 1744,//814, //BOTTOM_MENU에 숫자 표기
		GAME_BOTTOM_MENU_NUMBER_FOCUS	: 1745,//814, //BOTTOM_MENU에 숫자 표기
		GAME_BOTTOM_MENU_COVER	: 2000, //COVER이미지 - is_numkey 가 false일때 사용된다. -- 이거 canvas로 그릴때 의미가 있지 현재는 img tag로 cover를 덮고 있다.

		//20220805_ywlee 93 stage에서 타워설치정보를 웨이브정보 위에 표시하기 위함임.	 (901,902 --> 760,761)
		GAME_TOP_INFO					: 1760, //901,
		GAME_TOP_INFO_GAGE		: 1761,//902, //웨이브 게이지 바

		WARNING					: 1903, //warning 경고박스

		GAME_TEXT				: 1999, //일반적으로 GAME_TEXT는 제일위다. 몇몇만 빼고


		//20231005_twkim 영웅각성메뉴 때문에 만들었다.
		AWAKE_MENU : 1730,
		AWAKE_MENU_LOCK : 1730,  //자물쇠
		AWAKE_MENU_GBB : 1731,  //가위바위보
		AWAKE_MENU_DIM : 1732,  
		AWAKE_MENU_FOCUS : 1733,



	},
}

//각 플랫폼별 goods 정보가 다를 수 있어 함수로 빼서 사용함.  이 함수는 언제 호출할까?..... util_Global.js파일에서 glo.platform 정의하고 나서 바로 호출 됨.
DEFINE.goods = function()
{

	//---아래 내용은 아직은 플랫폼별 구별이 필요하지 않아 밖으로 뺌, 일부 플랫폼별 재 정의 해야 하는 것은 아래 switch문에서 재 정의 함.
			 
	//루비 구매 상점 - 돈(won)을 지불하고 루비를 얻는다.---------------------------------------------------
	DEFINE.MARKETSTORE_RUBY = 
	[	{},
		{title:"루비<br>11개",ruby:11,paywon:1000	,paywon_withvat:1100, TAG:0, ITEMID_INDEX:1}, 
		//{title:"루비 40개",ruby:40,paywon:3000	,paywon_withvat:3300, TAG:0, ITEMID_INDEX:2},
		{title:"루비<br>61개",ruby:61,paywon:5000	,paywon_withvat:5500, TAG:0, ITEMID_INDEX:2},
		{title:"루비<br>130개",ruby:130,	paywon:9000 ,paywon_withvat:9900, TAG:0, ITEMID_INDEX:3},
		{title:"루비<br>230개",ruby:230,	paywon:15000,paywon_withvat:16500,TAG:0, ITEMID_INDEX:4},
		//{title:"루비<br>660개",ruby:660,	paywon:50000,paywon_withvat:55000,TAG:0, ITEMID_INDEX:4},
	];

//	//골드 구매 상점 - ruby를 지불하고, gold를 얻는다. ---------------------------------------------------
//	DEFINE.MARKETSTORE_GOLD =
//	[	{},
//		{title:"골드<br>170,000",	gold:170000,	payruby:10, TAG:0}, 
//		{title:"골드<br>540,000",	gold:540000,	payruby:30, TAG:0},
//		{title:"골드<br>1,330,000",	gold:1330000,	payruby:70, TAG:0},
//		//{title:"골드 2,000,000",	gold:2000000,	payruby:100, TAG:0},
//		{title:"골드<br>3,150,000",	gold:3150000,	payruby:150, TAG:0},
//	];
//	//20230221_ywlee 상점에서 골드구매를 다이아로 하기
	DEFINE.MARKETSTORE_GOLD =
	[	{},

/*
		{title:"골드<br>170,000",		gold:170000,	payruby:0, paydia:100, TAG:0}, 
		{title:"골드<br>540,000",		gold:540000,	payruby:0, paydia:300, TAG:0},
		{title:"골드<br>1,330,000",	gold:1330000,	payruby:0, paydia:700, TAG:0},
*/
		//20240116_ywlee GH요청사항 전면 적용 DIA좀더 박하게 주기
		{title:"골드<br>100,000",		gold:100000,	payruby:0, paydia:100, TAG:0}, 
		{title:"골드<br>330,000",		gold:330000,	payruby:0, paydia:300, TAG:0},
		{title:"골드<br>840,000",		gold:840000,	payruby:0, paydia:700, TAG:0},

		//{title:"골드<br>3,150,000",	gold:3150000,	payruby:0, paydia:1500, TAG:0},
		{title:"골드<br>31,500,000",	gold:31500000,	payruby:0, paydia:15000, TAG:0},//길드 나가면서......
	];

	//다아아 구매 상점 - ruby를 지불하고, 다이아를 얻는다.	---------------------------------------------------
	DEFINE.MARKETSTORE_DIA =
	[	{},
		{title:"다이아<br>100개",	dia:100,	payruby:10}, 
		//{title:"다이아 210개",	dia:210,	payruby:20},
		{title:"다이아<br>550개",	dia:550,	payruby:50},
		{title:"다이아<br>1,150개",	dia:1150,	payruby:100},
		{title:"다이아<br>3,600개",	dia:3600,	payruby:300},
		//{title:"다이아 6250개",	dia:6250,	payruby:500},
	];																					 
																			

	//패키지---------------------------------------------------
	switch(glo.platform)
	{
		case glo.PLATFORM.SKB: DEFINE.goods_SKB(); break;//SKB는 월정액이 있다.
		case glo.PLATFORM.ATV: DEFINE.goods_ATV(); break;//ATV,AMO는 ITEM_INDEX사용하지 않고, PID를 사용한다. 
		case glo.PLATFORM.AMO: DEFINE.goods_AMO(); break;//amo는 스크롤 안되니깐 4개만 보여 주자.
		case glo.PLATFORM.HCN: DEFINE.goods_HCN(); break;//HCN은 1만원 넘지 않게 구성 하라고 해서 좀 바꼈다. (영웅패키지 없음)
		case glo.PLATFORM.CJH: DEFINE.goods_CJH(); break;//CJH은 1만원 넘지 않게 구성 하라고 해서 좀 바꼈다. (영웅패키지 없음)
		case glo.PLATFORM.DLIVE: DEFINE.goods_DLIVE(); break;//DLIVE은 1만원 넘지 않게 구성 하라고 해서 좀 바꼈다. (영웅패키지 없음)
		case glo.PLATFORM.KT:  DEFINE.goods_KT();  break;//KT는 SKB와 달리 월정액이 없다.	  ITEMID_INDEX는 SKB에만 사용한다.	KT는 상품코드 없이 VAT포함 금액을 바로 보내 결제진행 한다.
		case glo.PLATFORM.SS:  DEFINE.goods_SS();  break;//
		case glo.PLATFORM.LG:  DEFINE.goods_LG();  break;//LG 삼성 동일함.
		case glo.PLATFORM.GH:  DEFINE.goods_GH();  break;//GameHollyWood
		default: console.error("Undefined : DEFINE.goods_"+glo.platform+" in define.js");break ;
	}
}

//SKB의 패키지 상품 정의 - 월정액이 있다.
DEFINE.goods_SKB = function()
{
	//20260619_jhyu 로키 스페셜 상품 추가
	DEFINE.MARKETSTORE_SPECIAL = 
	[	{},
		{title:"로키 스페셜 상품", title_en:"Loki Special Product",
			paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_loki_special_product", XSOLLA_PID:87, ITEMID_INDEX:6},
	];

	DEFINE.MARKETSTORE_PACKAGE = //돈(won)을 지불하고 패키지를 구매한다.
	[   {}, 
		{title:"대박패키지",	gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:1,hero:[0,11,13,6],tower:[0,4005],		
									paywon:30000, paywon_withvat:33000, TAG:1, ITEMID_INDEX:5}, //계정당 1회구입가능
		{title:"굴베이그 마력 패키지",	gold:0,	ruby:0,	dia:0,magic:50,	rainbow:0,	recommend:1, num:2,		
									paywon:15000, paywon_withvat:16500, TAG:1, ITEMID_INDEX:10}, //무한정 구입가능
		{title:"굴베이그 마력 패키지",	gold:0,	ruby:0,	dia:0,magic:110,	rainbow:0,	recommend:1, num:3,		
									paywon:30000, paywon_withvat:33000, TAG:1, ITEMID_INDEX:5}, //무한정 구입가능
		// {title:"엘리야패키지B",	gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:1,hero:[0,25,26,27],		
		// 							paywon:30000, paywon_withvat:33000, TAG:1, ITEMID_INDEX:5}, //계정당 
		 {title:"아이템패키지",			gold:0,			ruby:70,	dia:0,		rainbow:0, recommend:1,item:[0,5,5,5,5,5], /*각 5개씩*/
									paywon:7000, paywon_withvat:7700, TAG:1, ITEMID_INDEX:9}, //하루3회구매가능	  	
		{title:"초보패키지",	gold:0,	ruby:50,	dia:0,	rainbow:0,	recommend:0,tower:[0,1005,1008,2023,2017], //1회만 구매 가능, 레벨5이하일때만 구매가능, 5레벨이하 경험치 2배
									item:[0,10,10,2,3,10],	paywon:5000, paywon_withvat:5500, TAG:1, ITEMID_INDEX:8},

/* //20230424_ywlee 과기부신고가 4400원 최소금액이라 빼달라고 SKB요청화서 뺌.
		{title:"월정액",			gold:0,	ruby:0,	dia:0,	rainbow:0,	recommend:1,
									paywon:3000, paywon_withvat:3300, TAG:0, ITEMID_INDEX:12}, 													
*/
			
		//20250421_jhyu 월정액 개편 관련으로 신규 가입중지	
		// {title:"정기 구독 패키지",			gold:0,	ruby:0,	dia:0,	rainbow:0,	recommend:1,
									// paywon:10000, paywon_withvat:11000, TAG:0, ITEMID_INDEX:15}, 													
		{title:"일일패키지(골드)",		gold:500000,	ruby:0,	dia:0,		rainbow:0,	recommend:0, //recommend 추천태그 붙일래(1), 먈래(0)	
									paywon:1000, paywon_withvat:1100, TAG:0, ITEMID_INDEX:6}, //TAG : 추천 태크, ITEMID_INDEX: gEntrix.item_id[]의 index임.
		{title:"일일패키지(만능)",		gold:0,			ruby:0,	dia:0,		rainbow:10, recommend:0,
									paywon:2000, paywon_withvat:2200, TAG:0, ITEMID_INDEX:7},
		{title:"영웅패키지",	gold:0,			ruby:0,	dia:0,		rainbow:0,	recommend:1,hero:[0,4,5,6], //1~18까지 있다.
									due_start: "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									due_end  : "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									paywon:15000, paywon_withvat:16500, TAG:1, ITEMID_INDEX:10}, //기간동안 1회만 구매
		{title:"영웅패키지",	gold:0,			ruby:0,	dia:0,		rainbow:0,	recommend:1,hero:[0,7,8,9], //1~18까지 있다.
									due_start: "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									due_end  : "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									paywon:15000, paywon_withvat:16500, TAG:1, ITEMID_INDEX:10}, //기간동안 1회만 구매
		{title:"영웅패키지",	gold:0,			ruby:0,	dia:0,		rainbow:0,	recommend:1,hero:[0,10,11,12], //1~18까지 있다.
									due_start: "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									due_end  : "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									paywon:15000, paywon_withvat:16500, TAG:1, ITEMID_INDEX:10}, //기간동안 1회만 구매
		{title:"영웅패키지",	gold:0,			ruby:0,	dia:0,		rainbow:0,	recommend:1,hero:[0,13,14,15], //1~18까지 있다.
									due_start: "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									due_end  : "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									paywon:15000, paywon_withvat:16500, TAG:1, ITEMID_INDEX:10}, //기간동안 1회만 구매
		{title:"영웅패키지",	gold:0,			ruby:0,	dia:0,		rainbow:0,	recommend:1,hero:[0,16,17,18], //1~18까지 있다.
									due_start: "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									due_end  : "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									paywon:15000, paywon_withvat:16500, TAG:1, ITEMID_INDEX:10}, //기간동안 1회만 구매
		{title:"영웅패키지",	gold:0,			ruby:0,	dia:0,		rainbow:0,	recommend:1,hero:[0,19,20,21], //1~18까지 있다.
									due_start: "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									due_end  : "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									paywon:15000, paywon_withvat:16500, TAG:1, ITEMID_INDEX:10}, //기간동안 1회만 구매
		{title:"영웅패키지",	gold:0,			ruby:0,	dia:0,		rainbow:0,	recommend:1,hero:[0,22,23,24], //1~18까지 있다.
									due_start: "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									due_end  : "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									paywon:15000, paywon_withvat:16500, TAG:1, ITEMID_INDEX:10}, //기간동안 1회만 구매
		{title:"영웅패키지",	gold:0,			ruby:0,	dia:0,		rainbow:0,	recommend:1,hero:[0,25,26,27], //1~18까지 있다.
									due_start: "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									due_end  : "", //구매가능기간 DEFINEJS_EVENT.event_hero_package 에서 재정의한다 여긴 의미없음
									paywon:15000, paywon_withvat:16500, TAG:1, ITEMID_INDEX:10}, //기간동안 1회만 구매
		{title:"묶음패키지",	gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:0,
									due_start: "2022/05/11 00:00:00", //구매가능기간 DEFINEJS_EVENT.event_bundle_package 에서 재정의한다 여긴 의미없음
									due_end  : "2022/05/12 03:00:00", //구매가능기간 DEFINEJS_EVENT.event_bundle_package 에서 재정의한다 여긴 의미없음	 		
									paywon:15000, paywon_withvat:16500, TAG:0, ITEMID_INDEX:11}, 	
	];

//	gEntrix.item_id_SKB = //SKB상품코드임. ----- DEFINE.MARKETSTORE_PACKAGE.ITEMID_INDEX에 배정해야 함. 그리고 영웅은 S_game_hero_define.js에서 ITEM_INDEX로 정의 함.
//	[	"",		   //		//0번지 사용안함.
//		"6597528", //1		//루비 1000원		
//		"6597529", //2		//루비 5000원		
//		"6597530", //3		//루비 9000원		---- 웁스 영웅 1개당 9000원 이므로 상품ID함께 사용함.
//		"6597531", //4		//루비 16500원
//		"-------", //5		//dumy-----------------이하패키지---------
//		"6597532", //6		//패키지(골드) 1000원
//		"6597533", //7		//패키지(만능카드) 2000원	
//		"6597534", //8		//패키지(초보) 5000원
//		"6597535", //9		//패키지(아이템) 7000원	
//		"6597536", //10		//패키지(영웅) 15000원	
//		"6597537", //11		//패키지(묶음) 15000원	
//		"6597538", //12		//월정액	//12
//		"-------", //13		//dummy---------------
//		"6597530", //14		//영웅 낱개구매 -- 타플랫폼과 index통일하기 위해 3번지에 있는 상품ID한번더 사용함. 영웅은 항상 14번지 여야 한다..
//	];		

	gEntrix.item_id_SKB = //SKB상품코드임. ----- DEFINE.MARKETSTORE_PACKAGE.ITEMID_INDEX에 배정해야 함. 그리고 영웅은 S_game_hero_define.js에서 ITEM_INDEX로 정의 함.
	[	"",		   //		//0번지 사용안함.
		"6597528", //1		//루비 1000원		
		"6597529", //2		//루비 5000원		
		"6597530", //3		//루비 9000원		---- 웁스 영웅 1개당 9000원 이므로 상품ID함께 사용함.
		"6597531", //4		//루비 16500원
		"6603233", //5		//루비 33000원  --- 20220617에 추가 됨
		"6597532", //6		//패키지(골드) 1000원
		"6597533", //7		//패키지(만능카드) 2000원	
		"6597534", //8		//패키지(초보) 5000원
		"6597535", //9		//패키지(아이템) 7000원	
		"6597536", //10		//패키지(영웅) 15000원	
		"6597537", //11		//패키지(묶음) 15000원	
		"6597538", //12		//월정액	//12
		"-------", //13		//dummy---------------
		"6597530", //14		//영웅 낱개구매 -- 타플랫폼과 index통일하기 위해 3번지에 있는 상품ID한번더 사용함. 영웅은 항상 14번지 여야 한다..
		"6604529", //15		//20240109_월정액개편  새로받은 상품코드 


	];	

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_MAGIC =
	[	{},
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:50,	rainbow:0,	recommend:1, num:2,		
									paywon:15000, paywon_withvat:16500, TAG:1, ITEMID_INDEX:10}, //무한정 구입가능
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:110,	rainbow:0,	recommend:1, num:3,		
									paywon:30000, paywon_withvat:33000, TAG:1, ITEMID_INDEX:5}, //무한정 구입가능
	];

	//루비 구매 상점 - 돈(won)을 지불하고 루비를 얻는다.---------------------------------------------------
	DEFINE.MARKETSTORE_RUBY = 
	[	{},
		//{title:"루비<br>11개",ruby:11,paywon:1000	,paywon_withvat:1100, TAG:0, ITEMID_INDEX:1}, 
		{title:"루비<br>61개",ruby:61,paywon:5000	,paywon_withvat:5500, TAG:0, ITEMID_INDEX:2},
		{title:"루비<br>130개",ruby:130,	paywon:9000 ,paywon_withvat:9900, TAG:0, ITEMID_INDEX:3},
		{title:"루비<br>230개",ruby:230,	paywon:15000,paywon_withvat:16500,TAG:0, ITEMID_INDEX:4},
		{title:"루비<br>560개",ruby:560,	paywon:30000,paywon_withvat:33000,TAG:0, ITEMID_INDEX:5},
	];

}

//ATV의 패키지 상품 정의 - 월정액이 있다. ATV의 경우 ITEM_INDEX 사용하지 않고 PID사용함(DEFINE.MARKETSTORE_RUBY 재정의함).
DEFINE.goods_ATV = function()
{
	//20260716_dhlee 이벤트 뽑기 상품 추가
	DEFINE.MARKETSTORE_EVENTMENU_GACHA = 
	[	{},
		{title:"이벤트 뽑기 다음 판 이동권", title_en:"Event Gacha Skip Ticket",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_eventmenu_gacha_skip_ticket", XSOLLA_PID:99, ITEMID_INDEX:3},
	];

	//20260716_dhlee 이벤트 상점 상품 추가
	DEFINE.MARKETSTORE_EVENTMENU_SHOP = 
	[	{},
		{title:"이벤트 재화 1,500개", title_en:"Event Money X 1,500",
							paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_eventmenu_shop_package1", XSOLLA_PID:95, ITEMID_INDEX:1},
		{title:"이벤트 재화 5,000개", title_en:"Event Money X 5,000",
							paywon:3000, paywon_withvat:3300, payusd:3.0, PID:"tower_atv_eventmenu_shop_package2", XSOLLA_PID:96, ITEMID_INDEX:2},
		{title:"이벤트 재화 9,000개", title_en:"Event Money X 9,000",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_eventmenu_shop_package3", XSOLLA_PID:97, ITEMID_INDEX:3},
		{title:"이벤트 재화 18,000개", title_en:"Event Money X 18,000",
							paywon:9000, paywon_withvat:9900, payusd:9.0, PID:"tower_atv_eventmenu_shop_package4", XSOLLA_PID:98, ITEMID_INDEX:4},
		//20260826_dhlee 추석 스페셜 이벤트 상품 추가
		{title:"이벤트 재화 250,000개", title_en:"Event Money X 250,000",
			                paywon:100000, paywon_withvat:110000, payusd:100.0, PID:"tower_atv_eventmenu_shop_package5" , XSOLLA_PID:100},
	];

	//20260619_jhyu 로키 스페셜 상품 추가
	//20260702_jhyu 스페셜 후속 상품 추가
	DEFINE.MARKETSTORE_SPECIAL = 
	[	{},
		{title:"로키 스페셜 상품", title_en:"Loki Special Product",
							paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_loki_special_product", XSOLLA_PID:87, ITEMID_INDEX:6},
		{title:"마력 스페셜 상품", title_en:"Magic Special Product",
							paywon:3000, paywon_withvat:3300, payusd:3.0, PID:"tower_atv_magic_special_product", XSOLLA_PID:90, ITEMID_INDEX:2},
		{title:"헬나이트 스페셜 상품", title_en:"HellKnight Special Product",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_hellknight_special_product", XSOLLA_PID:91, ITEMID_INDEX:3},
		{title:"루비 스페셜 상품", title_en:"Ruby Special Product",
							paywon:9000, paywon_withvat:9900, payusd:9.0, PID:"tower_atv_ruby_special_product", XSOLLA_PID:92, ITEMID_INDEX:4},
	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_PASS =
	[	{},
		//20260220_dhlee 보스전 패스권 추가
		{title:"보스전 패스권 (초급)", title_en:"Boss Fight Pass - Beginner", gold:0, ruby:0, dia:0, rainbow:0, recommend:0,
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:0, PID:"tower_atv_boss_monthly_beginner"},  //20260220_dhlee 보스전 패스권 추가

        {title:"보스전 패스권 (상급)", title_en:"Boss Fight Pass - Advanced", gold:0, ruby:0, dia:0, rainbow:0, recommend:0,
			paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_boss_monthly_advanced"},  //20260220_dhlee 보스전 패스권 추가

		//20250327_jhyu 로키 패스 추가
		{title:"로키 패스", title_en: "Loki Pass" , mythic_hero_bunho:37, recommend:1,
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:1, PID:"tower_atv_mythic_pass"},	//한번 구매하면 한달짜리, 구독아님

		//20250507_jhyu 월정액 개편
		{title:"초보자 패스권", 		gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,	
									paywon:3000, paywon_withvat:3300, payusd:3.0, TAG:0, PID:"tower_atv_monthly_beginner"},
		{title:"상급자 패스권", 		gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,								
									paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_monthly_advanced"}, 
	];

	DEFINE.MARKETSTORE_PACKAGE = //돈(won)을 지불하고 패키지를 구매한다.
	[   {},
		//20260826_dhlee 추석 패키지
		{title:"월묘 패키지", title_en: "Lunar Rabbit Package", recommend:1,
			paywon:50000, paywon_withvat:55000, payusd:50.0, TAG:1, PID:"tower_atv_lunar_rabbit_package" , XSOLLA_PID:108},
		{title:"추석 스페셜 패키지 (대)", title_en: "Chuseok Special Package (Big)", recommend:0, product:'ruby',
			paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_chuseok_big_package" , XSOLLA_PID:101,ITEMID_INDEX:3},
		{title:"추석 스페셜 패키지 (대)", title_en: "Chuseok Special Package (Big)", recommend:0, product:'magic',
			paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_chuseok_big_package" , XSOLLA_PID:101,ITEMID_INDEX:3},
		{title:"추석 스페셜 패키지 (소)", title_en: "Chuseok Special Package (Small)", recommend:0, product:'ruby',
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:1, PID:"tower_atv_chuseok_small_package" , XSOLLA_PID:102,ITEMID_INDEX:1},
		{title:"추석 스페셜 패키지 (소)", title_en: "Chuseok Special Package (Small)", recommend:0, product:'magic',
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:1, PID:"tower_atv_chuseok_small_package" , XSOLLA_PID:102,ITEMID_INDEX:1},

		//20260826_jhyu 길드 영지전 패키지
		{title:"길드 영지전 패키지 1", title_en: "Guild Territory Package 1", recommend:0,
					paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_guild_territeory_package_10" , XSOLLA_PID:103},
		{title:"길드 영지전 패키지 2", title_en: "Guild Territory Package 2", recommend:0,
					paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_guild_territeory_package_10" , XSOLLA_PID:104},
		{title:"길드 영지전 패키지 3", title_en: "Guild Territory Package 3", recommend:0,
					paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_guild_territeory_package_30" , XSOLLA_PID:105},
		{title:"길드 영지전 패키지 4", title_en: "Guild Territory Package 4", recommend:0,
					paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_guild_territeory_package_30" , XSOLLA_PID:106},
		{title:"길드 영지전 패키지 5", title_en: "Guild Territory Package 5", recommend:0,
					paywon:50000, paywon_withvat:55000, payusd:50.0, TAG:0, PID:"tower_atv_guild_territeory_package_50" , XSOLLA_PID:107},

		//20260723_dhlee 늦여름 패키지
		{title:"푸른 여름 패키지(타워)", title_en: "Blue Summer (Tower) Package", recommend:1, tower_num:5043,
			        paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:1, PID:"tower_atv_blue_summer_tower_package" , XSOLLA_PID:80},
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:55,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_blue_summer_soul_package" , XSOLLA_PID:81},

		//20260714_jhyu 까마귀 타워, 태식 패키지
		{title:"푸른 여름 패키지(타워)", title_en: "Blue Summer (Tower) Package", recommend:1, tower_num:5046,
					paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:1, PID:"tower_atv_blue_summer_tower_package" , XSOLLA_PID:80},
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:64,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_blue_summer_soul_package" , XSOLLA_PID:81},

		//20260702_jhyu 길드 스테이지 재선택 상품
		{title:"길드 버프 재선택권", 	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,
									paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:0, PID:"tower_atv_guild_buff_reroll_ticket", XSOLLA_PID:88, ITEMID_INDEX:3},
        {title:"길드 버프 재선택권(무제한)", 	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_guild_buff_reroll_ticket_unlimited", XSOLLA_PID:89}, 

		//20260623_jhyu 여름 나기 패키지
		{title:"푸른 여름 패키지(타워)", title_en: "Blue Summer (Tower) Package", recommend:1, tower_num:5040,
					paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:1, PID:"tower_atv_blue_summer_tower_package" , XSOLLA_PID:80},
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:52,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_blue_summer_soul_package" , XSOLLA_PID:81},

		//20260615_dhlee 220스테이지 클리어 패키지 추가
		{title:"220스테이지 클리어 패키지(쉬움)", title_en: "220 Stage Clear Package(Easy)" , recommend:0,
			paywon:15000, paywon_withvat:16500, payusd:15.0, TAG:0, PID:"tower_atv_stage_220_clear_easy_package", XSOLLA_PID:84},
		{title:"220스테이지 클리어 패키지(보통)", title_en: "220 Stage Clear Package(Normal)" , recommend:0,
			paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_stage_220_clear_normal_package", XSOLLA_PID:85},
		{title:"220스테이지 클리어 패키지(어려움)", title_en: "220 Stage Clear Package(Hard)" , recommend:0,
			paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:0, PID:"tower_atv_stage_220_clear_hard_package", XSOLLA_PID:86},
	
		//20260330_dhlee 뱀여왕 패키지 추가
		{title:"신화 영웅 패키지", title_en: "Mythic Hero Package", recommend:1, hero_num: 61,
			paywon:90000, paywon_withvat:99000, payusd:90.0, TAG:1, PID:"tower_atv_mythic_hero_package"},

		//신화 펜리르 패키지
		{title:"신화 영웅 패키지", title_en: "Mythic Hero Package", recommend:1, hero_num: 58,
			paywon:90000, paywon_withvat:99000, payusd:90.0, TAG:1, PID:"tower_atv_mythic_hero_package"},
									
		//20250702_jhyu 스테이지 패키지 쉬움
		{title:"스테이지 패키지(쉬움)", title_en: "Stage Package(Easy)" , recommend:0, stage_type: "eldorado",
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_stage_easy_package"},
		//헬나이트 패키지
		{title:"신화 영웅 패키지", title_en: "Mythic Hero Package" , recommend:0, hero_num: 46,
									paywon:90000, paywon_withvat:99000, payusd:90.0, TAG:0, PID:"tower_atv_mythic_hero_package"},
		//헬나이트 영혼석
		{title:"신화 영웅 영혼석 1개", title_en: "Mythic Hero Soul x1" , recommend:0, hero_num: 46,
									paywon:3000, paywon_withvat:3300, payusd:3.0, TAG:0, PID:"tower_atv_mythic_soul_x1"},
									
		
		{title:"대박패키지",	gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:1,hero:[0,11,13,6],tower:[0,4005],		
									paywon:30000, paywon_withvat:33000, payusd:30.0,TAG:1, PID:"tower_atv_pack_ohmygod"}, //계정당 1회구입가능
		
		{title:"아이템패키지",	gold:0,			ruby:70,	dia:0,		rainbow:0, recommend:0,item:[0,5,5,5,5,5], /*각 5개씩*/
									paywon:7000, paywon_withvat:7700, payusd:7.0,TAG:1, PID:"tower_atv_pack_item"}, //하루3회구매가능		
		{title:"초보패키지",	gold:0,	ruby:50,	dia:0,	rainbow:0,	recommend:1,
									tower:[0,1005,1008,2023,2017], //1회만 구매 가능, 레벨5이하일때만 구매가능, 5레벨이하 경험치 2배
									item:[0,10,10,2,3,10],paywon:5000, paywon_withvat:5500, payusd:5.0,TAG:0, PID:"tower_atv_pack_start"},

		{title:"일일패키지(골드)",		gold:500000,	ruby:10,	dia:0,		rainbow:0,	recommend:0, //recommend 추천태그 붙일래(1), 먈래(0)	
									paywon:1000, paywon_withvat:1100, payusd:1.0,TAG:0, PID:"tower_atv_pack_day_gold"}, //TAG : 추천 태크, PID: gEntrix.item_id[]의 index임.
		{title:"일일패키지(만능)",		gold:0,			ruby:0,	dia:0,		rainbow:10, recommend:0,
									paywon:2000, paywon_withvat:2200, payusd:2.0,TAG:0, PID:"tower_atv_pack_day_card"},	
		
		//20260324_jhyu 상점 개편, 영웅 패키지 합체
		{title:"영웅패키지",			gold:0,			ruby:0,	dia:0,		rainbow:0,	recommend:1,
									hero:[0,4,7,10,13,16,19,22,25],
									paywon:15000, paywon_withvat:16500, payusd:15.0,TAG:1, PID:"tower_atv_pack_hero"},

		{title:"묶음패키지",			gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:0,			
									paywon:15000, paywon_withvat:16500, payusd:15.0,TAG:0, PID:"tower_atv_pack_group"},

	
	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_MAGIC =
	[	{},
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:10,	rainbow:0,	recommend:1,num:1,	
									paywon:3000, paywon_withvat:3300, payusd:3.0,TAG:1, PID:"tower_atv_pack_magic_1"}, //무한정 구입가능
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:110,	rainbow:0,	recommend:1,	num:3,	
									paywon:30000, paywon_withvat:33000, payusd:30.0,TAG:1, PID:"tower_atv_pack_magic_3"}, //무한정 구입가능
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:500,	rainbow:0,	recommend:1,	num:4,	
									paywon:100000, paywon_withvat:110000, payusd:100.0,TAG:1, PID:"tower_atv_pack_magic_4"}, //무한정 구입가능
	];

	//AMO,ATV의 경우 ITEM_INDEX 사용하지 않고 PID사용함.
	DEFINE.MARKETSTORE_RUBY =
	[	{},
		//{title:"루비<br>11개",ruby:11,paywon:1000	,paywon_withvat:1100, payusd:1.0,TAG:0, PID:"tower_atv_ruby_1"}, 
		{title:"루비<br>61개",ruby:61,paywon:5000	,paywon_withvat:5500, payusd:5.0,TAG:0, PID:"tower_atv_ruby_2"},
		{title:"루비<br>130개",ruby:130,	paywon:9000 ,paywon_withvat:9900, payusd:9.0,TAG:0, PID:"tower_atv_ruby_3"},
		{title:"루비<br>230개",ruby:230,	paywon:15000,paywon_withvat:16500,payusd:15.0,TAG:0, PID:"tower_atv_ruby_4"},
		{title:"루비<br>560개",ruby:560,	paywon:30000,paywon_withvat:33000,payusd:30.0,TAG:0, PID:"tower_atv_ruby_5"},
	];						
}
DEFINE.goods_AMO = function()
{
	//20260716_dhlee 이벤트 뽑기 상품 추가
	DEFINE.MARKETSTORE_EVENTMENU_GACHA = 
	[	{},
		{title:"이벤트 뽑기 다음 판 이동권", title_en:"Event Gacha Skip Ticket",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_eventmenu_gacha_skip_ticket", XSOLLA_PID:99, ITEMID_INDEX:3},
	];

	//20260716_dhlee 이벤트 상점 상품 추가
	DEFINE.MARKETSTORE_EVENTMENU_SHOP = 
	[	{},
		{title:"이벤트 재화 1,500개", title_en:"Event Money X 1,500",
							paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_eventmenu_shop_package1", XSOLLA_PID:95, ITEMID_INDEX:1},
		{title:"이벤트 재화 5,000개", title_en:"Event Money X 5,000",
							paywon:3000, paywon_withvat:3300, payusd:3.0, PID:"tower_atv_eventmenu_shop_package2", XSOLLA_PID:96, ITEMID_INDEX:2},
		{title:"이벤트 재화 9,000개", title_en:"Event Money X 9,000",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_eventmenu_shop_package3", XSOLLA_PID:97, ITEMID_INDEX:3},
		{title:"이벤트 재화 18,000개", title_en:"Event Money X 18,000",
							paywon:9000, paywon_withvat:9900, payusd:9.0, PID:"tower_atv_eventmenu_shop_package4", XSOLLA_PID:98, ITEMID_INDEX:4},
		//20260826_dhlee 추석 스페셜 이벤트 상품 추가
		{title:"이벤트 재화 250,000개", title_en:"Event Money X 250,000",
			                paywon:100000, paywon_withvat:110000, payusd:100.0, PID:"tower_atv_eventmenu_shop_package5" , XSOLLA_PID:100},
	];

	//20260619_jhyu 로키 스페셜 상품 추가
	DEFINE.MARKETSTORE_SPECIAL = 
	[	{},
		{title:"로키 스페셜 상품", title_en:"Loki Special Product",
							paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_loki_special_product", XSOLLA_PID:87, ITEMID_INDEX:6},
		{title:"마력 스페셜 상품", title_en:"Magic Special Product",
							paywon:3000, paywon_withvat:3300, payusd:3.0, PID:"tower_atv_magic_special_product", XSOLLA_PID:90, ITEMID_INDEX:2},
		{title:"헬나이트 스페셜 상품", title_en:"HellKnight Special Product",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_hellknight_special_product", XSOLLA_PID:91, ITEMID_INDEX:3},
		{title:"루비 스페셜 상품", title_en:"Ruby Special Product",
							paywon:9000, paywon_withvat:9900, payusd:9.0, PID:"tower_atv_ruby_special_product", XSOLLA_PID:92, ITEMID_INDEX:4},
	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_PASS =
	[	{},
		//20260220_dhlee 보스전 패스권 추가
		{title:"보스전 패스권 (초급)", title_en:"Boss Fight Pass - Beginner", gold:0, ruby:0, dia:0, rainbow:0, recommend:0,
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:0, PID:"tower_atv_boss_monthly_beginner"},  //20260220_dhlee 보스전 패스권 추가

        {title:"보스전 패스권 (상급)", title_en:"Boss Fight Pass - Advanced", gold:0, ruby:0, dia:0, rainbow:0, recommend:0,
			paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_boss_monthly_advanced"},  

		//20250327_jhyu 로키 패스 추가
		{title:"로키 패스", title_en: "Loki Pass" , mythic_hero_bunho:37, recommend:1, 
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:1, PID:"tower_atv_mythic_pass"},	//한번 구매하면 한달짜리, 구독아님
		
		//20250507_jhyu 월정액 개편
		{title:"초보자 패스권", 		gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,	
									paywon:3000, paywon_withvat:3300, payusd:3.0, TAG:0, PID:"tower_atv_monthly_beginner"},
		{title:"상급자 패스권", 		gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,								
									paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_monthly_advanced"}, 
	];

	DEFINE.MARKETSTORE_PACKAGE = //돈(won)을 지불하고 패키지를 구매한다.
	[   {},
		//20260826_dhlee 추석 패키지
		{title:"월묘 패키지", title_en: "Lunar Rabbit Package", recommend:1,
			paywon:50000, paywon_withvat:55000, payusd:50.0, TAG:1, PID:"tower_atv_lunar_rabbit_package" , XSOLLA_PID:108},
		{title:"추석 스페셜 패키지 (대)", title_en: "Chuseok Special Package (Big)", recommend:0, product:'ruby',
			paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_chuseok_big_package" , XSOLLA_PID:101,ITEMID_INDEX:3},
		{title:"추석 스페셜 패키지 (대)", title_en: "Chuseok Special Package (Big)", recommend:0, product:'magic',
			paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_chuseok_big_package" , XSOLLA_PID:101,ITEMID_INDEX:3},
		{title:"추석 스페셜 패키지 (소)", title_en: "Chuseok Special Package (Small)", recommend:0, product:'ruby',
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:1, PID:"tower_atv_chuseok_small_package" , XSOLLA_PID:102,ITEMID_INDEX:1},
		{title:"추석 스페셜 패키지 (소)", title_en: "Chuseok Special Package (Small)", recommend:0, product:'magic',
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:1, PID:"tower_atv_chuseok_small_package" , XSOLLA_PID:102,ITEMID_INDEX:1},

		//20260826_jhyu 길드 영지전 패키지
		{title:"길드 영지전 패키지 1", title_en: "Guild Territory Package 1", recommend:0,
					paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_guild_territeory_package_10" , XSOLLA_PID:103},
		{title:"길드 영지전 패키지 2", title_en: "Guild Territory Package 2", recommend:0,
					paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_guild_territeory_package_10" , XSOLLA_PID:104},
		{title:"길드 영지전 패키지 3", title_en: "Guild Territory Package 3", recommend:0,
					paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_guild_territeory_package_30" , XSOLLA_PID:105},
		{title:"길드 영지전 패키지 4", title_en: "Guild Territory Package 4", recommend:0,
					paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_guild_territeory_package_30" , XSOLLA_PID:106},
		{title:"길드 영지전 패키지 5", title_en: "Guild Territory Package 5", recommend:0,
					paywon:50000, paywon_withvat:55000, payusd:50.0, TAG:0, PID:"tower_atv_guild_territeory_package_50" , XSOLLA_PID:107},

		//20260723_dhlee 늦여름 패키지
		{title:"푸른 여름 패키지(타워)", title_en: "Blue Summer (Tower) Package", recommend:1, tower_num:5043,
			        paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:1, PID:"tower_atv_blue_summer_tower_package" , XSOLLA_PID:80},
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:55,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_blue_summer_soul_package" , XSOLLA_PID:81},

		//20260714_jhyu 까마귀 타워, 태식 패키지
		{title:"푸른 여름 패키지(타워)", title_en: "Blue Summer (Tower) Package", recommend:1, tower_num:5046,
					paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:1, PID:"tower_atv_blue_summer_tower_package" , XSOLLA_PID:80},
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:64,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_blue_summer_soul_package" , XSOLLA_PID:81},

		//20260702_jhyu 길드 스테이지 재선택 상품
		{title:"길드 버프 재선택권", 	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,
									paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:0, PID:"tower_atv_guild_buff_reroll_ticket", XSOLLA_PID:88, ITEMID_INDEX:3},
        {title:"길드 버프 재선택권(무제한)", 	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_guild_buff_reroll_ticket_unlimited", XSOLLA_PID:89}, 

		//20260623_jhyu 여름 나기 패키지
		{title:"푸른 여름 패키지(타워)", title_en: "Blue Summer (Tower) Package", recommend:1, tower_num:5040,
					paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:1, PID:"tower_atv_blue_summer_tower_package" , XSOLLA_PID:80},
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:52,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_blue_summer_soul_package" , XSOLLA_PID:81},

		//20260615_dhlee 220스테이지 클리어 패키지 추가
		{title:"220스테이지 클리어 패키지(쉬움)", title_en: "220 Stage Clear Package(Easy)" , recommend:0,
			paywon:15000, paywon_withvat:16500, payusd:15.0, TAG:0, PID:"tower_atv_stage_220_clear_easy_package", XSOLLA_PID:84},
		{title:"220스테이지 클리어 패키지(보통)", title_en: "220 Stage Clear Package(Normal)" , recommend:0,
			paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_stage_220_clear_normal_package", XSOLLA_PID:85},
		{title:"220스테이지 클리어 패키지(어려움)", title_en: "220 Stage Clear Package(Hard)" , recommend:0,
			paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:0, PID:"tower_atv_stage_220_clear_hard_package", XSOLLA_PID:86},

		//20260330_dhlee 뱀여왕 패키지 추가
		{title:"신화 영웅 패키지", title_en: "Mythic Hero Package", recommend:1, hero_num: 61,
			paywon:90000, paywon_withvat:99000, payusd:90.0, TAG:1, PID:"tower_atv_mythic_hero_package"},
		
		//신화 펜리르 패키지
		{title:"신화 영웅 패키지", title_en: "Mythic Hero Package", recommend:1, hero_num: 58,
			paywon:90000, paywon_withvat:99000, payusd:90.0, TAG:1, PID:"tower_atv_mythic_hero_package"},

		//20250702_jhyu 스테이지 패키지 쉬움
		{title:"스테이지 패키지(쉬움)", title_en: "Stage Package(Easy)" , recommend:0, stage_type: "eldorado",
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_stage_easy_package"},
		//헬나이트 패키지
		{title:"신화 영웅 패키지", title_en: "Mythic Hero Package" , recommend:0, hero_num: 46,
									paywon:90000, paywon_withvat:99000, payusd:90.0, TAG:0, PID:"tower_atv_mythic_hero_package"},
		//헬나이트 영혼석
		{title:"신화 영웅 영혼석 1개", title_en: "Mythic Hero Soul x1" , recommend:0, hero_num: 46,
									paywon:3000, paywon_withvat:3300, payusd:3.0, TAG:0, PID:"tower_atv_mythic_soul_x1"},
		
		//태환아 묶음패키지가 제일 앞에 있어도 된다. 기간 아니면 자동으로 사라지게 해 두었다. 20231214_ywlee
		{title:"묶음패키지",			gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:0,
									due_start: "2022/05/11 00:00:00", //구매가능기간 DEFINEJS_EVENT.event_bundle_package 에서 재정의한다 여긴 의미없음
									due_end  : "2022/05/12 03:00:00", //구매가능기간		
									paywon:15000, paywon_withvat:16500, payusd:15.0,TAG:1, PID:"tower_atv_pack_group"},
		{title:"대박패키지",	gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:1,hero:[0,11,13,6],tower:[0,4005],		
									paywon:30000, paywon_withvat:33000,payusd:30.0, TAG:1, PID:"tower_atv_pack_ohmygod"}, //계정당 1회구입가능
									
		{title:"아이템패키지",	gold:0,	ruby:70,	dia:0,		rainbow:0, recommend:0,	item:[0,5,5,5,5,5], /*각 5개씩*/
									paywon:7000, paywon_withvat:7700, payusd:7.0,TAG:1, PID:"tower_atv_pack_item"}, //하루3회구매가능	
									
		{title:"초보패키지",	gold:0,	ruby:50,	dia:0,	rainbow:0,	recommend:1,
									tower:[0,1005,1008,2023,2017], //1회만 구매 가능, 레벨5이하일때만 구매가능, 5레벨이하 경험치 2배
									item:[0,10,10,2,3,10],paywon:5000, paywon_withvat:5500, payusd:5.0,TAG:0, PID:"tower_atv_pack_start"},
									

		{title:"일일패키지(골드)",		gold:500000,	ruby:10,	dia:0,		rainbow:0,	recommend:0, //recommend 추천태그 붙일래(1), 먈래(0)	
									paywon:1000, paywon_withvat:1100, payusd:1.0,TAG:0, PID:"tower_atv_pack_day_gold"}, //TAG : 추천 태크, PID: gEntrix.item_id[]의 index임.

		{title:"일일패키지(만능)",		gold:0,			ruby:0,	dia:0,		rainbow:10, recommend:0,
									paywon:2000, paywon_withvat:2200, payusd:2.0,TAG:0, PID:"tower_atv_pack_day_card"},	

		//20260324_jhyu 상점 개편, 영웅 패키지 합체
		{title:"영웅패키지",			gold:0,			ruby:0,	dia:0,		rainbow:0,	recommend:1,
									hero:[0,4,7,10,13,16,19,22,25],
									paywon:15000, paywon_withvat:16500, payusd:15.0,TAG:1, PID:"tower_atv_pack_hero"}, //기간동안 1회만 구매
	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_MAGIC =
	[	{},
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:10,	rainbow:0,	recommend:1,	num:1,	
									paywon:3000, paywon_withvat:3300, payusd:3.0,TAG:1, PID:"tower_atv_pack_magic_1"}, //무한정 구입가능
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:110,	rainbow:0,	recommend:1,	num:3,	
									paywon:30000, paywon_withvat:33000, payusd:30.0,TAG:1, PID:"tower_atv_pack_magic_3"}, //무한정 구입가능
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:500,	rainbow:0,	recommend:1,	num:4,	
									paywon:100000, paywon_withvat:110000, payusd:100.0,TAG:1, PID:"tower_atv_pack_magic_4"}, //무한정 구입가능
	];

	//AMO,ATV의 경우 ITEM_INDEX 사용하지 않고 PID사용함.
	DEFINE.MARKETSTORE_RUBY =
	[	{},
		//{title:"루비<br>11개",ruby:11,paywon:1000	,paywon_withvat:1100, payusd:1.0,TAG:0, PID:"tower_atv_ruby_1"}, 
		{title:"루비<br>61개",ruby:61,paywon:5000	,paywon_withvat:5500, payusd:5.0,TAG:0, PID:"tower_atv_ruby_2"},
		{title:"루비<br>130개",ruby:130,	paywon:9000 ,paywon_withvat:9900, payusd:9.0,TAG:0, PID:"tower_atv_ruby_3"},
		{title:"루비<br>230개",ruby:230,	paywon:15000,paywon_withvat:16500,payusd:15.0,TAG:0, PID:"tower_atv_ruby_4"},
		{title:"루비<br>560개",ruby:560,	paywon:30000,paywon_withvat:33000,payusd:30.0,TAG:0, PID:"tower_atv_ruby_5"},
	];
}

DEFINE.goods_HCN = function()
{
	//20260716_dhlee 이벤트 뽑기 상품 추가
	DEFINE.MARKETSTORE_EVENTMENU_GACHA = 
	[	{},
		{title:"이벤트 뽑기 다음 판 이동권", title_en:"Event Gacha Skip Ticket",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_eventmenu_gacha_skip_ticket", XSOLLA_PID:99, ITEMID_INDEX:3},
	];

	//20260716_dhlee 이벤트 상점 상품 추가
	DEFINE.MARKETSTORE_EVENTMENU_SHOP = 
	[	{},
		{title:"이벤트 재화 1,500개", title_en:"Event Money X 1,500",
							paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_eventmenu_shop_package1", XSOLLA_PID:95, ITEMID_INDEX:1},
		{title:"이벤트 재화 5,000개", title_en:"Event Money X 5,000",
							paywon:3000, paywon_withvat:3300, payusd:3.0, PID:"tower_atv_eventmenu_shop_package2", XSOLLA_PID:96, ITEMID_INDEX:2},
		{title:"이벤트 재화 9,000개", title_en:"Event Money X 9,000",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_eventmenu_shop_package3", XSOLLA_PID:97, ITEMID_INDEX:3},
		{title:"이벤트 재화 18,000개", title_en:"Event Money X 18,000",
							paywon:9000, paywon_withvat:9900, payusd:9.0, PID:"tower_atv_eventmenu_shop_package4", XSOLLA_PID:98, ITEMID_INDEX:4},
	];

	//20260619_jhyu 로키 스페셜 상품 추가
	DEFINE.MARKETSTORE_SPECIAL = 
	[	{},
		{title:"로키 스페셜 상품", title_en:"Loki Special Product",
							paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_loki_special_product", XSOLLA_PID:87, ITEMID_INDEX:6},
		{title:"마력 스페셜 상품", title_en:"Magic Special Product",
							paywon:3000, paywon_withvat:3300, payusd:3.0, PID:"tower_atv_magic_special_product", XSOLLA_PID:90, ITEMID_INDEX:2},
		{title:"헬나이트 스페셜 상품", title_en:"HellKnight Special Product",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_hellknight_special_product", XSOLLA_PID:91, ITEMID_INDEX:3},
		{title:"루비 스페셜 상품", title_en:"Ruby Special Product",
							paywon:9000, paywon_withvat:9900, payusd:9.0, PID:"tower_atv_ruby_special_product", XSOLLA_PID:92, ITEMID_INDEX:4},
	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_PASS =
	[	{},
		//20260220_dhlee 보스전 패스권 추가
		{title:"보스전 패스권 (초급)", title_en:"Boss Fight Pass - Beginner", gold:0, ruby:0, dia:0, rainbow:0, recommend:0,
								paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:0, ITEMID_INDEX:6},  
	
		{title:"보스전 패스권 (상급)", title_en:"Boss Fight Pass - Advanced", gold:0, ruby:0, dia:0, rainbow:0, recommend:0,
								paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, ITEMID_INDEX:11},
		
		//20250507_jhyu 월정액 개편
		{title:"초보자 패스권", 		gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,	
								paywon:3000, paywon_withvat:3300, TAG:0, ITEMID_INDEX:15},
		{title:"상급자 패스권", 		gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,
								paywon:10000, paywon_withvat:11000, TAG:0, ITEMID_INDEX:11}, 
	];

	DEFINE.MARKETSTORE_PACKAGE = //돈(won)을 지불하고 패키지를 구매한다.
	[   {},
		//20260826_dhlee 추석 패키지
		{title:"추석 스페셜 패키지 (대)", title_en: "Chuseok Special Package (Big)", recommend:0, product:'ruby',
			paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_chuseok_big_package" , XSOLLA_PID:101,ITEMID_INDEX:3},
		{title:"추석 스페셜 패키지 (대)", title_en: "Chuseok Special Package (Big)", recommend:0, product:'magic',
			paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_chuseok_big_package" , XSOLLA_PID:101,ITEMID_INDEX:3},
		{title:"추석 스페셜 패키지 (소)", title_en: "Chuseok Special Package (Small)", recommend:0, product:'ruby',
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:1, PID:"tower_atv_chuseok_small_package" , XSOLLA_PID:102,ITEMID_INDEX:1},
		{title:"추석 스페셜 패키지 (소)", title_en: "Chuseok Special Package (Small)", recommend:0, product:'magic',
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:1, PID:"tower_atv_chuseok_small_package" , XSOLLA_PID:102,ITEMID_INDEX:1},

		//20260723_dhlee 늦여름 패키지
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:55,
			        paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, ITEMID_INDEX:3},

		//20260714_jhyu 까마귀 타워, 태식 패키지
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:64,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, ITEMID_INDEX:3},

		//20260702_jhyu 길드 스테이지 재선택 상품
		{title:"길드 버프 재선택권", 	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,
									paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:0, PID:"tower_atv_guild_buff_reroll_ticket", XSOLLA_PID:88, ITEMID_INDEX:3},

		//20260623_jhyu 여름 나기 패키지
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:52,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, ITEMID_INDEX:3},

		//20250702_jhyu 헬나이트 영혼석
		{title:"신화 영웅 영혼석 1개", recommend:0, hero_num: 46,
									paywon:3000, paywon_withvat:3300, TAG:0, ITEMID_INDEX:15},

		{title:"대박패키지",	gold:0,	ruby:10,	dia:3000,	rainbow:0,	recommend:1,hero:[0,13],tower:[0,4005],		
								paywon:10000, paywon_withvat:11000, TAG:1, ITEMID_INDEX:11}, //계정당 1회구입가능
		
		{title:"초보패키지",	gold:0,	ruby:50,	dia:0,	rainbow:0,	recommend:1,tower:[0,1005,1008,2023,2017], //1회만 구매 가능, 레벨5이하일때만 구매가능, 5레벨이하 경험치 2배
									item:[0,10,10,2,3,10],paywon:5000, paywon_withvat:5500, TAG:0, ITEMID_INDEX:8},
		
		{title:"일일패키지(골드)",		gold:500000,	ruby:10,	dia:0,		rainbow:0,	recommend:0, //recommend 추천태그 붙일래(1), 먈래(0)	
									paywon:1000, paywon_withvat:1100, TAG:0, ITEMID_INDEX:6}, //TAG : 추천 태크, PID: gEntrix.item_id[]의 index임.
		{title:"일일패키지(만능)",		gold:0,	ruby:0,	dia:0,rainbow:10, recommend:0,paywon:2000, paywon_withvat:2200, TAG:0, ITEMID_INDEX:7},  
		{title:"묶음패키지",	gold:4000000,	ruby:65,	dia:4500,	rainbow:0,	recommend:0,	
								paywon:10000, paywon_withvat:11000, TAG:0, ITEMID_INDEX:11},	

		{title:"아이템패키지",			gold:0,	ruby:70,	dia:0,rainbow:0, recommend:0,	item:[0,5,5,5,5,5], /*각 5개씩*/
								paywon:7000, paywon_withvat:7700, TAG:1, ITEMID_INDEX:9}, //하루3회구매가능	
	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_MAGIC =
	[	{},
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:10,	rainbow:0,	recommend:1,	num:1,	
								paywon:3000, paywon_withvat:3300, TAG:1, ITEMID_INDEX:15}, //계정당 1회구입가능
	];

	//HCN의 경우 ITEM_INDEX 사용한다.
	DEFINE.MARKETSTORE_RUBY =
	[	{},
		{title:"루비<br>11개", ruby:11, paywon:1000,paywon_withvat:1100, TAG:0, ITEMID_INDEX:1}, 
		{title:"루비<br>33개", ruby:33, paywon:3000,paywon_withvat:3300, TAG:0, ITEMID_INDEX:2},
		{title:"루비<br>61개", ruby:61, paywon:5000,paywon_withvat:5500, TAG:0, ITEMID_INDEX:3},
		{title:"루비<br>130개",ruby:130,paywon:9000,paywon_withvat:9900, TAG:0, ITEMID_INDEX:4}, 
	];
	
	//발급받은 상품ID (HCN 상용 상품코드) -- 라이브에서는 gEntrix.item_id 와    gEntrix.item_id_alask_HCN를 함께 정의해야 한다.
	gEntrix.item_id =
	[	"",			//0		//0번지 사용안함.
		"EXONOTXX100000064566",	//1		//루비 11개,  1000원
		"EXONOTXX100000064665",	//2		//루비 33개,  3000원
		"EXONOTXX100000064666",	//3		//루비 61개,  5000원
		"EXONOTXX100000064667",	//4		//루비 130개, 9000원
		"-----",	//5		//dumy-------------------이하패키지----------
		"EXONOTXX100000064668",	//6		//일일패키지(골드)	 1000원
		"EXONOTXX100000064669",	//7		//일일패키지(만능카드) 2000원
		"EXONOTXX100000064672",	//8		//초보패키지         5000원
		"EXONOTXX100000064673",	//9		//아이템패키지        7000원
		"-----",	//10	//dummy------------------영웅패키지를 HCN에는 못넣어 공백처리--------
		"EXONOTXX100000064674",	//11	//묶음패키지         10000원
		"EXONSSXX100000064671",	//12	//월정액		       3000원
		"-----",	//13	//dummy------------------이하 영웅-----------
		"EXONOTXX100000064675",	//14	//영웅 낱개구매, 각영웅당 9000원 -->S_game_hero_define.js파일에서 각영웅의 ITEM_INDEX는 14임.(SKB와 동일해야 함)

		"EXONOTXX100000079768",	//15	//마력 패키지		   3000원 
		"EXONSSXX100000079769",	//16	//정기구독		       10000원
	];
	//발급받은 상품ID (HCN 상용 상품코드)
	gEntrix.item_id_alask_HCN =
	[	"",			//0		//0번지 사용안함.
		"EXONOTXX100000064566",	//1		//루비 11개,  1000원
		"EXONOTXX100000064665",	//2		//루비 33개,  3000원
		"EXONOTXX100000064666",	//3		//루비 61개,  5000원
		"EXONOTXX100000064667",	//4		//루비 130개, 9000원
		"-----",	//5		//dumy-------------------이하패키지----------
		"EXONOTXX100000064668",	//6		//일일패키지(골드)	 1000원
		"EXONOTXX100000064669",	//7		//일일패키지(만능카드) 2000원
		"EXONOTXX100000064672",	//8		//초보패키지         5000원
		"EXONOTXX100000064673",	//9		//아이템패키지        7000원
		"-----",	//10	//dummy------------------영웅패키지를 HCN에는 못넣어 공백처리--------
		"EXONOTXX100000064674",	//11	//묶음패키지         10000원
		"EXONSSXX100000064671",	//12	//월정액		       3000원
		"-----",	//13	//dummy------------------이하 영웅-----------
		"EXONOTXX100000064675",	//14	//영웅 낱개구매, 각영웅당 9000원 -->S_game_hero_define.js파일에서 각영웅의 ITEM_INDEX는 14임.(SKB와 동일해야 함)

		"EXONOTXX100000079768",	//15	//마력 패키지		   3000원 
		"EXONSSXX100000079769",	//16	//정기구독		       10000원
	];

	//발급받은 상품ID (HCN 테스트베드 상품코드) --//20230131_ywlee HCN에서 전달한 테스트 상품코드 삽입함.
	gEntrix.testbed_item_id_alask_HCN =
	[	"",			//0		//0번지 사용안함.
		"EXONOTXX100000062174",	//1		//루비 11개,  1000원
		"EXONOTXX100000062173",	//2		//루비 33개,  3000원
		"EXONOTXX100000062172",	//3		//루비 61개,  5000원
		"EXONOTXX100000062171",	//4		//루비 130개, 9000원
		"-----",	//5		//dumy-------------------이하패키지----------
		"EXONOTXX100000062170",	//6		//일일패키지(골드)	 1000원
		"EXONOTXX100000062169",	//7		//일일패키지(만능카드) 2000원
		"EXONOTXX100000062167",	//8		//초보패키지         5000원
		"EXONOTXX100000062166",	//9		//아이템패키지        7000원
		"-----",	//10	//dummy------------------영웅패키지를 HCN에는 못넣어 공백처리--------
		"EXONOTXX100000062165",	//11	//묶음패키지         10000원
		"EXONSSXX100000062168",	//12	//월정액		       3000원
		"-----",	//13	//dummy------------------이하 영웅-----------
		"EXONOTXX100000062065",	//14	//영웅 낱개구매, 각영웅당 9000원 -->S_game_hero_define.js파일에서 각영웅의 ITEM_INDEX는 14임.(SKB와 동일해야 함)

		"EXONOTXX100000064765",	//15	//마력 패키지		   3000원 
		"EXONSSXX100000064766",	//16	//정기구독		       10000원
	];		
}

//20231120_ywlee CJH추가를 위해 HCN copy함.
DEFINE.goods_CJH = function()
{
	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_PASS =
	[	{},

	];

	DEFINE.MARKETSTORE_PACKAGE = //돈(won)을 지불하고 패키지를 구매한다.
	[   {},
		{title:"대박패키지",	gold:0,	ruby:10,	dia:3000,	rainbow:0,	recommend:1,hero:[0,13],tower:[0,4005],		
								paywon:10000, paywon_withvat:11000, TAG:1, ITEMID_INDEX:15}, //계정당 1회구입가능
		
		{title:"초보패키지",	gold:0,	ruby:50,	dia:0,	rainbow:0,	recommend:1,tower:[0,1005,1008,2023,2017], //1회만 구매 가능, 레벨5이하일때만 구매가능, 5레벨이하 경험치 2배
									item:[0,10,10,2,3,10],paywon:5000, paywon_withvat:5500, TAG:0, ITEMID_INDEX:8},
		// {title:"월정액",				gold:0,	ruby:0,	dia:0,	rainbow:0,	recommend:0,paywon:3000, paywon_withvat:3300, TAG:0, ITEMID_INDEX:12}, 
		//20250421_jhyu 월정액 개편 관련으로 신규 가입중지	
		// {title:"정기 구독 패키지",				gold:0,	ruby:0,	dia:0,	rainbow:0,	recommend:0,paywon:10000, paywon_withvat:11000, TAG:0, ITEMID_INDEX:12}, 
		{title:"일일패키지(골드)",		gold:500000,	ruby:10,	dia:0,		rainbow:0,	recommend:0, //recommend 추천태그 붙일래(1), 먈래(0)	
									paywon:1000, paywon_withvat:1100, TAG:0, ITEMID_INDEX:6}, //TAG : 추천 태크, PID: gEntrix.item_id[]의 index임.
		{title:"일일패키지(만능)",		gold:0,	ruby:0,	dia:0,rainbow:10, recommend:0,paywon:2000, paywon_withvat:2200, TAG:0, ITEMID_INDEX:7},  
		{title:"묶음패키지",	gold:4000000,	ruby:65,	dia:4500,	rainbow:0,	recommend:0,
								due_start: "2022/05/11 00:00:00", //구매가능기간 DEFINEJS_EVENT.event_bundle_package 에서 재정의한다 여긴 의미없음
								due_end  : "2022/05/12 03:00:00", //구매가능기간		
								paywon:10000, paywon_withvat:11000, TAG:0, ITEMID_INDEX:11},	

		{title:"아이템패키지",			gold:0,	ruby:70,	dia:0,rainbow:0, recommend:0,	item:[0,5,5,5,5,5], /*각 5개씩*/
								paywon:7000, paywon_withvat:7700, TAG:1, ITEMID_INDEX:9}, //하루3회구매가능	
								
	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_MAGIC =
	[	{},
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:10,	rainbow:0,	recommend:1,	num:1,	
		 						paywon:3000, paywon_withvat:3300, TAG:1, ITEMID_INDEX:16}, //계정당 1회구입가능
	];

	//HCN의 경우 ITEM_INDEX 사용한다.
	DEFINE.MARKETSTORE_RUBY =
	[	{},
		{title:"루비<br>11개", ruby:11, paywon:1000,paywon_withvat:1100, TAG:0, ITEMID_INDEX:1}, 
		{title:"루비<br>33개", ruby:33, paywon:3000,paywon_withvat:3300, TAG:0, ITEMID_INDEX:2},
		{title:"루비<br>61개", ruby:61, paywon:5000,paywon_withvat:5500, TAG:0, ITEMID_INDEX:3},
		{title:"루비<br>130개",ruby:130,paywon:9000,paywon_withvat:9900, TAG:0, ITEMID_INDEX:4}, 
	];
	
	// 20231123_dblee CJH 상용 상품코드 적용함.
	//발급받은 상품ID (CJH 상용 상품코드) -- 라이브에서는 gEntrix.item_id 와    gEntrix.item_id_alask_HCN를 함께 정의해야 한다.
	gEntrix.item_id =
	[	"",			//0		//0번지 사용안함.
		"EXONOTXX100000074273",	//1		//루비 11개,  1000원
		"EXONOTXX100000074274",	//2		//루비 33개,  3000원
		"EXONOTXX100000074275",	//3		//루비 61개,  5000원
		"EXONOTXX100000074276",	//4		//루비 130개, 9000원
		"-----",	//5		//dumy-------------------이하패키지----------
		"EXONOTXX100000074269",	//6		//일일패키지(골드)	 1000원
		"EXONOTXX100000074270",	//7		//일일패키지(만능카드) 2000원
		"EXONOTXX100000074268",	//8		//초보패키지         5000원
		"EXONOTXX100000074267",	//9		//아이템패키지        7000원
		"-----",	//10	//dummy------------------영웅패키지를 HCN에는 못넣어 공백처리--------
		"EXONOTXX100000074271",	//11	//묶음패키지         10000원
		"EXONSSXX100000074965",	//12	//월정액		       3000원
		"-----",	//13	//dummy------------------이하 영웅-----------
		"EXONOTXX100000074272",	//14	//영웅 낱개구매, 각영웅당 9000원 -->S_game_hero_define.js파일에서 각영웅의 ITEM_INDEX는 14임.(SKB와 동일해야 함)

		"EXONOTXX100000074265", //15  대박 패키지
		"EXONOTXX100000074266", //16  굴베이그 마력

	];
	// 20231123_dblee CJH 상용 상품코드 적용함.
	//발급받은 상품ID (CJH 상용 상품코드)
	gEntrix.item_id_alask =
	[	"",			//0		//0번지 사용안함.
		"EXONOTXX100000074273",	//1		//루비 11개,  1000원
		"EXONOTXX100000074274",	//2		//루비 33개,  3000원
		"EXONOTXX100000074275",	//3		//루비 61개,  5000원
		"EXONOTXX100000074276",	//4		//루비 130개, 9000원
		"-----",	//5		//dumy-------------------이하패키지----------
		"EXONOTXX100000074269",	//6		//일일패키지(골드)	 1000원
		"EXONOTXX100000074270",	//7		//일일패키지(만능카드) 2000원
		"EXONOTXX100000074268",	//8		//초보패키지         5000원
		"EXONOTXX100000074267",	//9		//아이템패키지        7000원
		"-----",	//10	//dummy------------------영웅패키지를 HCN에는 못넣어 공백처리--------
		"EXONOTXX100000074271",	//11	//묶음패키지         10000원
		"EXONSSXX100000074965",	//12	//월정액		       3000원
		"-----",	//13	//dummy------------------이하 영웅-----------
		"EXONOTXX100000074272",	//14	//영웅 낱개구매, 각영웅당 9000원 -->S_game_hero_define.js파일에서 각영웅의 ITEM_INDEX는 14임.(SKB와 동일해야 함)

		"EXONOTXX100000074265", //15  대박 패키지
		"EXONOTXX100000074266", //16  굴베이그 마력
	];
	// 20231123_dblee CJH 테스트 상품코드 받지 못해 CJH 상용 상품코드 적용함.
	//발급받은 상품ID (CJH 테스트베드 상품코드) --//20230131_ywlee HCN에서 전달한 테스트 상품코드 삽입함.
	gEntrix.testbed_item_id_alask =
	[	"",			//0		//0번지 사용안함.
		"EXONOTXX100000074273",	//1		//루비 11개,  1000원
		"EXONOTXX100000074274",	//2		//루비 33개,  3000원
		"EXONOTXX100000074275",	//3		//루비 61개,  5000원
		"EXONOTXX100000074276",	//4		//루비 130개, 9000원
		"-----",	//5		//dumy-------------------이하패키지----------
		"EXONOTXX100000074269",	//6		//일일패키지(골드)	 1000원
		"EXONOTXX100000074270",	//7		//일일패키지(만능카드) 2000원
		"EXONOTXX100000074268",	//8		//초보패키지         5000원
		"EXONOTXX100000074267",	//9		//아이템패키지        7000원
		"-----",	//10	//dummy------------------영웅패키지를 HCN에는 못넣어 공백처리--------
		"EXONOTXX100000074271",	//11	//묶음패키지         10000원
		"EXONSSXX100000074965",	//12	//월정액		       3000원
		"-----",	//13	//dummy------------------이하 영웅-----------
		"EXONOTXX100000074272",	//14	//영웅 낱개구매, 각영웅당 9000원 -->S_game_hero_define.js파일에서 각영웅의 ITEM_INDEX는 14임.(SKB와 동일해야 함)

		"EXONOTXX100000074265", //15  대박 패키지
		"EXONOTXX100000074266", //16  굴베이그 마력
	];		
}

//20240114_ywlee DLIVE향 추가
DEFINE.goods_DLIVE = function()
{
	//20260716_dhlee 이벤트 뽑기 상품 추가
	DEFINE.MARKETSTORE_EVENTMENU_GACHA = 
	[	{},
		{title:"이벤트 뽑기 다음 판 이동권", title_en:"Event Gacha Skip Ticket",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_eventmenu_gacha_skip_ticket", XSOLLA_PID:99, ITEMID_INDEX:3},
	];

	//20260716_dhlee 이벤트 상점 상품 추가
	DEFINE.MARKETSTORE_EVENTMENU_SHOP = 
	[	{},
		{title:"이벤트 재화 1,500개", title_en:"Event Money X 1,500",
							paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_eventmenu_shop_package1", XSOLLA_PID:95, ITEMID_INDEX:1},
		{title:"이벤트 재화 5,000개", title_en:"Event Money X 5,000",
							paywon:3000, paywon_withvat:3300, payusd:3.0, PID:"tower_atv_eventmenu_shop_package2", XSOLLA_PID:96, ITEMID_INDEX:2},
		{title:"이벤트 재화 9,000개", title_en:"Event Money X 9,000",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_eventmenu_shop_package3", XSOLLA_PID:97, ITEMID_INDEX:3},
		{title:"이벤트 재화 18,000개", title_en:"Event Money X 18,000",
							paywon:9000, paywon_withvat:9900, payusd:9.0, PID:"tower_atv_eventmenu_shop_package4", XSOLLA_PID:98, ITEMID_INDEX:4},
	];

	//20260619_jhyu 로키 스페셜 상품 추가
	DEFINE.MARKETSTORE_SPECIAL = 
	[	{},
		{title:"로키 스페셜 상품", title_en:"Loki Special Product",
							paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_loki_special_product", XSOLLA_PID:87, ITEMID_INDEX:6},
		{title:"마력 스페셜 상품", title_en:"Magic Special Product",
							paywon:3000, paywon_withvat:3300, payusd:3.0, PID:"tower_atv_magic_special_product", XSOLLA_PID:90, ITEMID_INDEX:2},
		{title:"헬나이트 스페셜 상품", title_en:"HellKnight Special Product",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_hellknight_special_product", XSOLLA_PID:91, ITEMID_INDEX:3},
		{title:"루비 스페셜 상품", title_en:"Ruby Special Product",
							paywon:9000, paywon_withvat:9900, payusd:9.0, PID:"tower_atv_ruby_special_product", XSOLLA_PID:92, ITEMID_INDEX:4},
	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_PASS =
	[	{},
		//20260220_dhlee 보스전 패스권 추가
		{title:"보스전 패스권 (초급)", title_en:"Boss Fight Pass - Beginner", gold:0, ruby:0, dia:0, rainbow:0, recommend:0,
			                    paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:0, ITEMID_INDEX:6},  

        {title:"보스전 패스권 (상급)", title_en:"Boss Fight Pass - Advanced", gold:0, ruby:0, dia:0, rainbow:0, recommend:0,
			                    paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, ITEMID_INDEX:15},
							
		//20250507_jhyu 월정액 개편
		{title:"초보자 패스권", 		gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,	
								paywon:3000, paywon_withvat:3300, TAG:0, ITEMID_INDEX:16},
		{title:"상급자 패스권", 		gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,
								paywon:10000, paywon_withvat:11000, TAG:0, ITEMID_INDEX:15}, 
	];

	DEFINE.MARKETSTORE_PACKAGE = //돈(won)을 지불하고 패키지를 구매한다.
	[   {},
		//20260826_dhlee 추석 패키지
		{title:"추석 스페셜 패키지 (대)", title_en: "Chuseok Special Package (Big)", recommend:0, product:'ruby',
			paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_chuseok_big_package" , XSOLLA_PID:101,ITEMID_INDEX:3},
		{title:"추석 스페셜 패키지 (대)", title_en: "Chuseok Special Package (Big)", recommend:0, product:'magic',
			paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_chuseok_big_package" , XSOLLA_PID:101,ITEMID_INDEX:3},
		{title:"추석 스페셜 패키지 (소)", title_en: "Chuseok Special Package (Small)", recommend:0, product:'ruby',
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:1, PID:"tower_atv_chuseok_small_package" , XSOLLA_PID:102,ITEMID_INDEX:1},
		{title:"추석 스페셜 패키지 (소)", title_en: "Chuseok Special Package (Small)", recommend:0, product:'magic',
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:1, PID:"tower_atv_chuseok_small_package" , XSOLLA_PID:102,ITEMID_INDEX:1},

		//20260723_dhlee 늦여름 패키지
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:55,
			paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, ITEMID_INDEX:3},

		//20260714_jhyu 까마귀 타워, 태식 패키지
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:64,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, ITEMID_INDEX:3},

		//20260702_jhyu 길드 스테이지 재선택 상품
		{title:"길드 버프 재선택권", 	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,
									paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:0, PID:"tower_atv_guild_buff_reroll_ticket", XSOLLA_PID:88, ITEMID_INDEX:3},

		//20260623_jhyu 여름 나기 패키지
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:52,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, ITEMID_INDEX:3},

		//20250702_jhyu 헬나이트 영혼석
		{title:"신화 영웅 영혼석 1개", recommend:0, hero_num: 46,
									paywon:3000, paywon_withvat:3300, payusd:3.0, TAG:0, ITEMID_INDEX:16},

		{title:"대박패키지",	gold:0,	ruby:10,	dia:3000,	rainbow:0,	recommend:1,hero:[0,13],tower:[0,4005],		
								paywon:10000, paywon_withvat:11000, TAG:1, ITEMID_INDEX:15}, //계정당 1회구입가능
		
		{title:"초보패키지",	gold:0,	ruby:50,	dia:0,	rainbow:0,	recommend:1,tower:[0,1005,1008,2023,2017], //1회만 구매 가능, 레벨5이하일때만 구매가능, 5레벨이하 경험치 2배
									item:[0,10,10,2,3,10],paywon:5000, paywon_withvat:5500, TAG:0, ITEMID_INDEX:8},
		
		//{title:"월정액",				gold:0,	ruby:0,	dia:0,	rainbow:0,	recommend:0,paywon:3000, paywon_withvat:3300, TAG:0, ITEMID_INDEX:12}, 
		//20250421_jhyu 월정액 개편 관련으로 신규 가입중지	
		 // {title:"정기 구독 패키지",				gold:0,	ruby:0,	dia:0,	rainbow:0,	recommend:0,paywon:10000, paywon_withvat:11000, TAG:0, ITEMID_INDEX:12}, 
		{title:"일일패키지(골드)",		gold:500000,	ruby:10,	dia:0,		rainbow:0,	recommend:0, //recommend 추천태그 붙일래(1), 먈래(0)	
								paywon:1000, paywon_withvat:1100, TAG:0, ITEMID_INDEX:6}, //TAG : 추천 태크, PID: gEntrix.item_id[]의 index임.
		{title:"일일패키지(만능)",		gold:0,	ruby:0,	dia:0,rainbow:10, recommend:0,
								paywon:2000, paywon_withvat:2200, TAG:0, ITEMID_INDEX:7},  
		{title:"묶음패키지",	gold:4000000,	ruby:65,	dia:4500,	rainbow:0,	recommend:0,	
								paywon:10000, paywon_withvat:11000, TAG:0, ITEMID_INDEX:11},	

		{title:"아이템패키지",			gold:0,	ruby:70,	dia:0,rainbow:0, recommend:0,	item:[0,5,5,5,5,5], /*각 5개씩*/
								paywon:7000, paywon_withvat:7700, TAG:1, ITEMID_INDEX:9}, //하루3회구매가능		
		
	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_MAGIC =
	[	{},
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:10,	rainbow:0,	recommend:1,	num:1,	
		 						paywon:3000, paywon_withvat:3300, TAG:1, ITEMID_INDEX:16}, //계정당 1회구입가능
	];

	//DLIVE의 경우 ITEM_INDEX 사용한다.
	DEFINE.MARKETSTORE_RUBY =
	[	{},
		{title:"루비<br>11개", ruby:11, paywon:1000,paywon_withvat:1100, TAG:0, ITEMID_INDEX:1}, 
		{title:"루비<br>33개", ruby:33, paywon:3000,paywon_withvat:3300, TAG:0, ITEMID_INDEX:2},
		{title:"루비<br>61개", ruby:61, paywon:5000,paywon_withvat:5500, TAG:0, ITEMID_INDEX:3},
		{title:"루비<br>130개",ruby:130,paywon:9000,paywon_withvat:9900, TAG:0, ITEMID_INDEX:4}, 
	];
	
	//발급받은 상품ID (DLIVE 상용 상품코드)
	gEntrix.item_id =
	[	"",			//0		//0번지 사용안함.
		"IC10000185",	//1		//루비 11개,  1000원
		"IC10000186",	//2		//루비 33개,  3000원
		"IC10000187",	//3		//루비 61개,  5000원
		"IC10000188",	//4		//루비 130개, 9000원
		"-----",	//5		//dumy-------------------이하패키지----------
		"IC10000189",	//6		//일일패키지(골드)	 1000원
		"IC10000190",	//7		//일일패키지(만능카드) 2000원
		"IC10000191",	//8		//초보패키지         5000원
		"IC10000192",	//9		//아이템패키지        7000원
		"-----",	//10	//dummy------------------영웅패키지를 HCN에는 못넣어 공백처리--------
		"IC10000193",	//11	//묶음패키지         10000원
		"PD10021270",	//12	//정기구독		     10000원
		"-----",	//13	//dummy------------------이하 영웅-----------
		"IC10000194",	//14	//영웅 낱개구매, 각영웅당 9000원 -->S_game_hero_define.js파일에서 각영웅의 ITEM_INDEX는 14임.(SKB와 동일해야 함)

		"IC10000195", //15  대박 패키지
		"IC10000196", //16  굴베이그 마력
	];
}

DEFINE.goods_KT = function()
{
	//20260619_jhyu 로키 스페셜 상품 추가
	DEFINE.MARKETSTORE_SPECIAL = 
	[	{},
		{title:"로키 스페셜 상품", title_en:"Loki Special Product",
			paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_loki_special_product", XSOLLA_PID:87, ITEMID_INDEX:6},
	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_PASS =
	[	{},
		//20250507_jhyu 월정액 개편
		{title:"초보자 패스권", 		gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,	
									paywon:3000, paywon_withvat:3300, TAG:0, ITEMID_INDEX:0},
		{title:"상급자 패스권", 		gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,								
									paywon:10000, paywon_withvat:11000, TAG:0, ITEMID_INDEX:0}, 
	];

	DEFINE.MARKETSTORE_PACKAGE = //돈(won)을 지불하고 패키지를 구매한다. //KT는 상풍코드없이, 
	[   {},
		//20250702_jhyu 헬나이트 영혼석
		{title:"신화 영웅 영혼석 1개", recommend:0, hero_num: 46,
									paywon:3000, paywon_withvat:3300, payusd:3.0, TAG:0, ITEMID_INDEX:0},

		{title:"대박패키지",	gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:1,hero:[0,11,13,6],tower:[0,4005],		
								paywon:30000, paywon_withvat:33000, TAG:1, ITEMID_INDEX:0}, //계정당 1회구입가능	
							
		// {title:"엘리야패키지B",	gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:1,hero:[0,25,26,27],		
		// 						paywon:30000, paywon_withvat:33000, TAG:1, ITEMID_INDEX:0}, //계정당 1회구입가능	
							
		{title:"초보패키지",	gold:0,	ruby:50,	dia:0,	rainbow:0,	recommend:0,
									tower:[0,1005,1008,2023,2017], //1회만 구매 가능, 레벨5이하일때만 구매가능, 5레벨이하 경험치 2배
									item:[0,10,10,2,3,10],paywon:5000, paywon_withvat:5500, TAG:0, ITEMID_INDEX:0},	 

		{title:"아이템패키지",			gold:0,			ruby:70,	dia:0,		rainbow:0, recommend:0,item:[0,5,5,5,5,5], /*각 5개씩*/
									paywon:7000, paywon_withvat:7700, TAG:0, ITEMID_INDEX:0}, //하루3회구매가능												
		{title:"일일패키지(골드)",		gold:500000,	ruby:10,	dia:0,		rainbow:0,	recommend:0, //recommend 추천태그 붙일래(1), 먈래(0)	
									paywon:1000, paywon_withvat:1100, TAG:0, ITEMID_INDEX:0}, //TAG : 추천 태크, ITEMID_INDEX: gEntrix.item_id[]의 index임.
		{title:"일일패키지(만능)",		gold:0,			ruby:0,	dia:0,		rainbow:10, recommend:0,paywon:2000, paywon_withvat:2200, TAG:0, ITEMID_INDEX:0},	


		//20260324_jhyu 상점 개편, 영웅 패키지 합체
		{title:"영웅패키지",			gold:0,			ruby:0,	dia:0,		rainbow:0,	recommend:1,
									hero:[0,4,7,10,13,16,19,22,25],
									paywon:15000, paywon_withvat:16500, TAG:1, ITEMID_INDEX:0}, //기간동안 1회만 구매		

		{title:"묶음패키지",	gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:0,
									due_start: "2022/05/11 00:00:00", //구매가능기간 DEFINEJS_EVENT.event_bundle_package 에서 재정의한다 여긴 의미없음
									due_end  : "2022/05/12 03:00:00", //구매가능기간		
									paywon:15000, paywon_withvat:16500, TAG:1, ITEMID_INDEX:0},										
	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_MAGIC =
	[	{},
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:10,	rainbow:0,	recommend:1,	num:1,	
								paywon:3000, paywon_withvat:3300, TAG:1, ITEMID_INDEX:0}, //계정당 1회구입가능	
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:110,	rainbow:0,	recommend:1,	num:3,	
								paywon:30000, paywon_withvat:33000, TAG:1, ITEMID_INDEX:0}, //계정당 1회구입가능
	];

	DEFINE.MARKETSTORE_RUBY =
	[	{},
		{title:"루비<br>11개", ruby:11, paywon:1000,paywon_withvat:1100, TAG:0, ITEMID_INDEX:1}, 
		{title:"루비<br>33개", ruby:33, paywon:3000,paywon_withvat:3300, TAG:0, ITEMID_INDEX:2},
		{title:"루비<br>61개", ruby:61, paywon:5000,paywon_withvat:5500, TAG:0, ITEMID_INDEX:3},
		{title:"루비<br>130개",ruby:130,paywon:9000,paywon_withvat:9900, TAG:0, ITEMID_INDEX:4}, 
	];
}

DEFINE.goods_SS = function()
{
	//20260716_dhlee 이벤트 뽑기 상품 추가
	DEFINE.MARKETSTORE_EVENTMENU_GACHA = 
	[	{},
		{title:"이벤트 뽑기 다음 판 이동권", title_en:"Event Gacha Skip Ticket",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_eventmenu_gacha_skip_ticket", XSOLLA_PID:99, ITEMID_INDEX:3},
	];

	//20260716_dhlee 이벤트 상점 상품 추가
	DEFINE.MARKETSTORE_EVENTMENU_SHOP = 
	[	{},
		{title:"이벤트 재화 1,500개", title_en:"Event Money X 1,500",
							paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_eventmenu_shop_package1", XSOLLA_PID:95, ITEMID_INDEX:1},
		{title:"이벤트 재화 5,000개", title_en:"Event Money X 5,000",
							paywon:3000, paywon_withvat:3300, payusd:3.0, PID:"tower_atv_eventmenu_shop_package2", XSOLLA_PID:96, ITEMID_INDEX:2},
		{title:"이벤트 재화 9,000개", title_en:"Event Money X 9,000",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_eventmenu_shop_package3", XSOLLA_PID:97, ITEMID_INDEX:3},
		{title:"이벤트 재화 18,000개", title_en:"Event Money X 18,000",
							paywon:9000, paywon_withvat:9900, payusd:9.0, PID:"tower_atv_eventmenu_shop_package4", XSOLLA_PID:98, ITEMID_INDEX:4},
		//20260826_dhlee 추석 스페셜 이벤트 상품 추가
		{title:"이벤트 재화 250,000개", title_en:"Event Money X 250,000",
			                paywon:100000, paywon_withvat:110000, payusd:100.0, PID:"tower_atv_eventmenu_shop_package5" , XSOLLA_PID:100},
	];

	//20260619_jhyu 로키 스페셜 상품 추가
	DEFINE.MARKETSTORE_SPECIAL = 
	[	{},
		{title:"로키 스페셜 상품", title_en:"Loki Special Product",
							paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_loki_special_product", XSOLLA_PID:87, ITEMID_INDEX:6},
		{title:"마력 스페셜 상품", title_en:"Magic Special Product",
							paywon:3000, paywon_withvat:3300, payusd:3.0, PID:"tower_atv_magic_special_product", XSOLLA_PID:90, ITEMID_INDEX:2},
		{title:"헬나이트 스페셜 상품", title_en:"HellKnight Special Product",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_hellknight_special_product", XSOLLA_PID:91, ITEMID_INDEX:3},
		{title:"루비 스페셜 상품", title_en:"Ruby Special Product",
							paywon:9000, paywon_withvat:9900, payusd:9.0, PID:"tower_atv_ruby_special_product", XSOLLA_PID:92, ITEMID_INDEX:4},
	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_PASS =
	[	{},
		//20260220_dhlee 보스전 패스권 추가
		{title:"보스전 패스권 (초급)", title_en:"Boss Fight Pass - Beginner", gold:0, ruby:0, dia:0, rainbow:0, recommend:0,
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:0, PID:"tower_atv_boss_monthly_beginner", XSOLLA_PID:71},  

        {title:"보스전 패스권 (상급)", title_en:"Boss Fight Pass - Advanced", gold:0, ruby:0, dia:0, rainbow:0, recommend:0,
			paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_boss_monthly_advanced", XSOLLA_PID:72},

		//20250327_jhyu 로키 패스 추가
		{title:"로키 패스", title_en: "Loki Pass" , mythic_hero_bunho:37, recommend:1, 
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:1, PID:"tower_atv_mythic_pass" , XSOLLA_PID:58},	//한번 구매하면 한달짜리, 구독아님
		
		//20250507_jhyu 월정액 개편
		{title:"초보자 패스권", title_en:"Monthly Pass - Beginner",	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,	
									paywon:3000, paywon_withvat:3300, payusd:3.0, TAG:0, PID:"tower_atv_monthly_beginner", XSOLLA_PID:59},
		{title:"상급자 패스권", title_en:"Monthly Pass - Advanced",	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,								
									paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_monthly_advanced", XSOLLA_PID:60}, 
	];

	// 20220317_dblee Xsolla 결제 구현 - payusd , XSOLLA_PID. title_en추가
	DEFINE.MARKETSTORE_PACKAGE = //돈(won)을 지불하고 패키지를 구매한다.
	[   {},
		//20260826_dhlee 추석 패키지
		{title:"월묘 패키지", title_en: "Lunar Rabbit Package", recommend:1,
			        paywon:50000, paywon_withvat:55000, payusd:50.0, TAG:1, PID:"tower_atv_lunar_rabbit_package" , XSOLLA_PID:108},
		{title:"추석 스페셜 패키지 (대)", title_en: "Chuseok Special Package (Big)", recommend:0, product:'ruby',
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_chuseok_big_package" , XSOLLA_PID:101,ITEMID_INDEX:3},
		{title:"추석 스페셜 패키지 (대)", title_en: "Chuseok Special Package (Big)", recommend:0, product:'magic',
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_chuseok_big_package" , XSOLLA_PID:101,ITEMID_INDEX:3},
		{title:"추석 스페셜 패키지 (소)", title_en: "Chuseok Special Package (Small)", recommend:0, product:'ruby',
					paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:1, PID:"tower_atv_chuseok_small_package" , XSOLLA_PID:102,ITEMID_INDEX:1},
		{title:"추석 스페셜 패키지 (소)", title_en: "Chuseok Special Package (Small)", recommend:0, product:'magic',
					paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:1, PID:"tower_atv_chuseok_small_package" , XSOLLA_PID:102,ITEMID_INDEX:1},

		//20260826_jhyu 길드 영지전 패키지
		{title:"길드 영지전 패키지 1", title_en: "Guild Territory Package 1", recommend:0,
					paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_guild_territeory_package_10" , XSOLLA_PID:103},
		{title:"길드 영지전 패키지 2", title_en: "Guild Territory Package 2", recommend:0,
					paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_guild_territeory_package_10" , XSOLLA_PID:104},
		{title:"길드 영지전 패키지 3", title_en: "Guild Territory Package 3", recommend:0,
					paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_guild_territeory_package_30" , XSOLLA_PID:105},
		{title:"길드 영지전 패키지 4", title_en: "Guild Territory Package 4", recommend:0,
					paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_guild_territeory_package_30" , XSOLLA_PID:106},
		{title:"길드 영지전 패키지 5", title_en: "Guild Territory Package 5", recommend:0,
					paywon:50000, paywon_withvat:55000, payusd:50.0, TAG:0, PID:"tower_atv_guild_territeory_package_50" , XSOLLA_PID:107},
					
		//20260723_dhlee 늦여름 패키지
		{title:"푸른 여름 패키지(타워)", title_en: "Blue Summer (Tower) Package", recommend:1, tower_num:5043,
			        paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:1, PID:"tower_atv_blue_summer_tower_package" , XSOLLA_PID:80},
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:55,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_blue_summer_soul_package" , XSOLLA_PID:81},

		//20260714_jhyu 까마귀 타워, 태식 패키지
		{title:"푸른 여름 패키지(타워)", title_en: "Blue Summer (Tower) Package", recommend:1, tower_num:5046,
					paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:1, PID:"tower_atv_blue_summer_tower_package" , XSOLLA_PID:80},
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:64,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_blue_summer_soul_package" , XSOLLA_PID:81},

		//20260702_jhyu 길드 스테이지 재선택 상품
		{title:"길드 버프 재선택권", 	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,
									paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:0, PID:"tower_atv_guild_buff_reroll_ticket", XSOLLA_PID:88, ITEMID_INDEX:3},
        {title:"길드 버프 재선택권(무제한)", 	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_guild_buff_reroll_ticket_unlimited", XSOLLA_PID:89}, 

		//20260623_jhyu 여름 나기 패키지
		{title:"푸른 여름 패키지(타워)", title_en: "Blue Summer (Tower) Package", recommend:1, tower_num:5040,
					paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:1, PID:"tower_atv_blue_summer_tower_package" , XSOLLA_PID:80},
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:52,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_blue_summer_soul_package" , XSOLLA_PID:81},

		//20260615_dhlee 220스테이지 클리어 패키지 추가
		{title:"220스테이지 클리어 패키지(쉬움)", title_en: "220 Stage Clear Package(Easy)" , recommend:0,
			                        paywon:15000, paywon_withvat:16500, payusd:15.0, TAG:0, PID:"tower_atv_stage_220_clear_easy_package", XSOLLA_PID:84},
		{title:"220스테이지 클리어 패키지(보통)", title_en: "220 Stage Clear Package(Normal)" , recommend:0,
			                        paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_stage_220_clear_normal_package", XSOLLA_PID:85},
		{title:"220스테이지 클리어 패키지(어려움)", title_en: "220 Stage Clear Package(Hard)" , recommend:0,
			                        paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:0, PID:"tower_atv_stage_220_clear_hard_package", XSOLLA_PID:86},

		//뱀여왕 패키지
		{title:"신화 영웅 패키지", title_en: "Mythic Hero Package", recommend:1, hero_num: 61,
			                        paywon:90000, paywon_withvat:99000, payusd:90.0, TAG:1, PID:"tower_atv_mythic_hero_package" , XSOLLA_PID:64},
		
		//신화 펜리르 패키지
		{title:"신화 영웅 패키지", title_en: "Mythic Hero Package", recommend:1, hero_num: 58,
									paywon:90000, paywon_withvat:99000, payusd:90.0, TAG:1, PID:"tower_atv_mythic_hero_package" , XSOLLA_PID:64},

		//20250702_jhyu 스테이지 패키지 쉬움
		{title:"스테이지 패키지(쉬움)", title_en: "Stage Package(Easy)" , recommend:0, stage_type: "eldorado",
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_stage_easy_package", XSOLLA_PID:65},
		//헬나이트 패키지
		{title:"신화 영웅 패키지", title_en: "Mythic Hero Package" , recommend:0, hero_num: 46,
									paywon:90000, paywon_withvat:99000, payusd:90.0, TAG:0, PID:"tower_atv_mythic_hero_package", XSOLLA_PID:64},
		//헬나이트 영혼석
		{title:"신화 영웅 영혼석 1개", title_en: "Mythic Hero Soul x1" , recommend:0, hero_num: 46,
									paywon:3000, paywon_withvat:3300, payusd:3.0, TAG:0, PID:"tower_atv_mythic_soul_x1", XSOLLA_PID:63},
		
		{title:"대박패키지",	 title_en : "Package - Wow" ,gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:1,hero:[0,11,13,6],tower:[0,4005],		
									paywon:30000, paywon_withvat:33000,payusd:30.0, TAG:1, PID:"tower_atv_pack_ohmygod" , XSOLLA_PID:18}, //계정당 1회구입가능

		{title:"아이템패키지", title_en:"Package - Item",			gold:0,	ruby:70,	dia:0,		rainbow:0, recommend:0,	item:[0,5,5,5,5,5], /*각 5개씩*/
									paywon:7000, paywon_withvat:7700, payusd:7.0, TAG:0, PID:"tower_atv_pack_item", XSOLLA_PID:17}, //하루3회구매가능		
		{title:"초보패키지", title_en:"Package - Newbie",	gold:0,	ruby:50,	dia:0,	rainbow:0,	recommend:1,
									tower:[0,1005,1008,2023,2017], //1회만 구매 가능, 레벨5이하일때만 구매가능, 5레벨이하 경험치 2배 //SS의 경우 엑솔라 결제이기 때문에 여기 정보 바뀌면 php(xsolla_ok_pay_reward_PACKAGE_beginner())함수 수정해 줘야 함.
									item:[0,10,10,2,3,10],paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_pack_start", XSOLLA_PID:11},


		{title:"일일패키지(골드)", title_en:"Package - Daily(Gold)",		gold:500000,	ruby:10,	dia:0,		rainbow:0,	recommend:0, //recommend 추천태그 붙일래(1), 먈래(0)	
									paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:0, PID:"tower_atv_pack_day_gold", XSOLLA_PID:15}, //TAG : 추천 태크, PID: gEntrix.item_id[]의 index임.
//AMO서비스에 보이지 않게 처리 함. 스크롤 때문에 4개만 보여지게 하기
		{title:"일일패키지(만능)", title_en:"Package - Daily(Cards)",		gold:0,			ruby:0,	dia:0,		rainbow:10, recommend:0,
									paywon:2000, paywon_withvat:2200, payusd:2.0, TAG:0, PID:"tower_atv_pack_day_card", XSOLLA_PID:16},	 
		
		//20260324_jhyu 상점 개편, 영웅 패키지 합체
		{title:"영웅패키지",	 title_en:"Package - Hero",gold:0,			ruby:0,	dia:0,		rainbow:0,	recommend:0,
									hero:[0,4,7,10,13,16,19,22,25],
									paywon:15000, paywon_withvat:16500, payusd:15.0, TAG:1, PID:"tower_atv_pack_hero", XSOLLA_PID:12}, //기간동안 1회만 구매	

		{title:"묶음패키지", title_en:"Package - Bundle",	gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:0,	
									paywon:15000, paywon_withvat:16500, payusd:15.0, TAG:1, PID:"tower_atv_pack_group", XSOLLA_PID:13},		

	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_MAGIC =
	[	{},
		{title:"굴베이그 마력", title_en:"Package - magic1",	gold:0,	ruby:0,	dia:0,magic:10,		rainbow:0, recommend:1,num:1,	
									paywon:3000, paywon_withvat:3300, payusd:3.0, TAG:1, PID:"tower_atv_pack_magic_1", XSOLLA_PID:48}, //무한정 구매가능		
		{title:"굴베이그 마력", title_en:"Package - magic3",	gold:0,	ruby:0,	dia:0,magic:110,		rainbow:0, recommend:1,num:3,	
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:1, PID:"tower_atv_pack_magic_3", XSOLLA_PID:50}, //무한정 구매가능
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:500,	rainbow:0,	recommend:1,	num:4,	
									paywon:100000, paywon_withvat:110000, payusd:100.0,TAG:1, PID:"tower_atv_pack_magic_4",XSOLLA_PID:51}, //무한정 구입가능
	];

	//AMO,ATV의 경우 ITEM_INDEX 사용하지 않고 PID사용함.
	// 20220317_dblee Xsolla 결제 구현 - payusd , XSOLLA_PID추가
	DEFINE.MARKETSTORE_RUBY =
	[	{},
		// {title:"루비<br>11개",ruby:11,paywon:1000	,paywon_withvat:1100, payusd:1.0, TAG:0, PID:"tower_atv_ruby_1", XSOLLA_PID:1}, 
		{title:"루비<br>61개",ruby:61,paywon:5000	,paywon_withvat:5500, payusd:5.0, TAG:0, PID:"tower_atv_ruby_2", XSOLLA_PID:2},
		{title:"루비<br>130개",ruby:130,	paywon:9000 ,paywon_withvat:9900, payusd:9.0, TAG:0, PID:"tower_atv_ruby_3", XSOLLA_PID:3},
		{title:"루비<br>230개",ruby:230,	paywon:15000,paywon_withvat:16500,payusd:15.0, TAG:0, PID:"tower_atv_ruby_4", XSOLLA_PID:4},
		{title:"루비<br>560개",ruby:560,	paywon:30000,paywon_withvat:33000,payusd:30.0, TAG:0, PID:"tower_atv_ruby_5", XSOLLA_PID:9},
	];		
}

DEFINE.goods_LG = function()
{
	//20260716_dhlee 이벤트 뽑기 상품 추가
	DEFINE.MARKETSTORE_EVENTMENU_GACHA = 
	[	{},
		{title:"이벤트 뽑기 다음 판 이동권", title_en:"Event Gacha Skip Ticket",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_eventmenu_gacha_skip_ticket", XSOLLA_PID:99, ITEMID_INDEX:3},
	];

	//20260716_dhlee 이벤트 상점 상품 추가
	DEFINE.MARKETSTORE_EVENTMENU_SHOP = 
	[	{},
		{title:"이벤트 재화 1,500개", title_en:"Event Money X 1,500",
							paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_eventmenu_shop_package1", XSOLLA_PID:95, ITEMID_INDEX:1},
		{title:"이벤트 재화 5,000개", title_en:"Event Money X 5,000",
							paywon:3000, paywon_withvat:3300, payusd:3.0, PID:"tower_atv_eventmenu_shop_package2", XSOLLA_PID:96, ITEMID_INDEX:2},
		{title:"이벤트 재화 9,000개", title_en:"Event Money X 9,000",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_eventmenu_shop_package3", XSOLLA_PID:97, ITEMID_INDEX:3},
		{title:"이벤트 재화 18,000개", title_en:"Event Money X 18,000",
							paywon:9000, paywon_withvat:9900, payusd:9.0, PID:"tower_atv_eventmenu_shop_package4", XSOLLA_PID:98, ITEMID_INDEX:4},
		//20260826_dhlee 추석 스페셜 이벤트 상품 추가
		{title:"이벤트 재화 250,000개", title_en:"Event Money X 250,000",
			                paywon:100000, paywon_withvat:110000, payusd:100.0, PID:"tower_atv_eventmenu_shop_package5" , XSOLLA_PID:100},
	];

	//20260619_jhyu 로키 스페셜 상품 추가
	DEFINE.MARKETSTORE_SPECIAL = 
	[	{},
		{title:"로키 스페셜 상품", title_en:"Loki Special Product",
							paywon:1000, paywon_withvat:1100, payusd:1.0, PID:"tower_atv_loki_special_product", XSOLLA_PID:87, ITEMID_INDEX:6},
		{title:"마력 스페셜 상품", title_en:"Magic Special Product",
							paywon:3000, paywon_withvat:3300, payusd:3.0, PID:"tower_atv_magic_special_product", XSOLLA_PID:90, ITEMID_INDEX:2},
		{title:"헬나이트 스페셜 상품", title_en:"HellKnight Special Product",
							paywon:5000, paywon_withvat:5500, payusd:5.0, PID:"tower_atv_hellknight_special_product", XSOLLA_PID:91, ITEMID_INDEX:3},
		{title:"루비 스페셜 상품", title_en:"Ruby Special Product",
							paywon:9000, paywon_withvat:9900, payusd:9.0, PID:"tower_atv_ruby_special_product", XSOLLA_PID:92, ITEMID_INDEX:4},
	];
	
	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_PASS =
	[	{},
		//20260220_dhlee 보스전 패스권 추가
		{title:"보스전 패스권 (초급)", title_en:"Boss Fight Pass - Beginner", gold:0, ruby:0, dia:0, rainbow:0, recommend:0,
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:0, PID:"tower_atv_boss_monthly_beginner", XSOLLA_PID:71},  

        {title:"보스전 패스권 (상급)", title_en:"Boss Fight Pass - Advanced", gold:0, ruby:0, dia:0, rainbow:0, recommend:0,
			paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_boss_monthly_advanced", XSOLLA_PID:72},

		//20250327_jhyu 로키 패스 추가
		{title:"로키 패스", title_en: "Loki Pass" , mythic_hero_bunho:37, recommend:1, 
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:1, PID:"tower_atv_mythic_pass" , XSOLLA_PID:58},	//한번 구매하면 한달짜리, 구독아님
		
		//20250507_jhyu 월정액 개편
		{title:"초보자 패스권", title_en:"Monthly Pass - Beginner",	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,	
									paywon:3000, paywon_withvat:3300, payusd:3.0, TAG:0, PID:"tower_atv_monthly_beginner", XSOLLA_PID:59},
		{title:"상급자 패스권", title_en:"Monthly Pass - Advanced",	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,								
									paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_monthly_advanced", XSOLLA_PID:60}, 
	];

	// 20220317_dblee Xsolla 결제 구현 - payusd , XSOLLA_PID. title_en추가
	DEFINE.MARKETSTORE_PACKAGE = //돈(won)을 지불하고 패키지를 구매한다.
	[   {},	
		//20260826_dhlee 추석 패키지
		{title:"월묘 패키지", title_en: "Lunar Rabbit Package", recommend:1,
			paywon:50000, paywon_withvat:55000, payusd:50.0, TAG:1, PID:"tower_atv_lunar_rabbit_package" , XSOLLA_PID:108},
		{title:"추석 스페셜 패키지 (대)", title_en: "Chuseok Special Package (Big)", recommend:0, product:'ruby',
			paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_chuseok_big_package" , XSOLLA_PID:101,ITEMID_INDEX:3},
		{title:"추석 스페셜 패키지 (대)", title_en: "Chuseok Special Package (Big)", recommend:0, product:'magic',
			paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_chuseok_big_package" , XSOLLA_PID:101,ITEMID_INDEX:3},
		{title:"추석 스페셜 패키지 (소)", title_en: "Chuseok Special Package (Small)", recommend:0, product:'ruby',
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:1, PID:"tower_atv_chuseok_small_package" , XSOLLA_PID:102,ITEMID_INDEX:1},
		{title:"추석 스페셜 패키지 (소)", title_en: "Chuseok Special Package (Small)", recommend:0, product:'magic',
			paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:1, PID:"tower_atv_chuseok_small_package" , XSOLLA_PID:102,ITEMID_INDEX:1},

		//20260826_jhyu 길드 영지전 패키지
		{title:"길드 영지전 패키지 1", title_en: "Guild Territory Package 1", recommend:0,
					paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_guild_territeory_package_10" , XSOLLA_PID:103},
		{title:"길드 영지전 패키지 2", title_en: "Guild Territory Package 2", recommend:0,
					paywon:10000, paywon_withvat:11000, payusd:10.0, TAG:0, PID:"tower_atv_guild_territeory_package_10" , XSOLLA_PID:104},
		{title:"길드 영지전 패키지 3", title_en: "Guild Territory Package 3", recommend:0,
					paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_guild_territeory_package_30" , XSOLLA_PID:105},
		{title:"길드 영지전 패키지 4", title_en: "Guild Territory Package 4", recommend:0,
					paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_guild_territeory_package_30" , XSOLLA_PID:106},
		{title:"길드 영지전 패키지 5", title_en: "Guild Territory Package 5", recommend:0,
					paywon:50000, paywon_withvat:55000, payusd:50.0, TAG:0, PID:"tower_atv_guild_territeory_package_50" , XSOLLA_PID:107},

		//20260723_dhlee 늦여름 패키지
		{title:"푸른 여름 패키지(타워)", title_en: "Blue Summer (Tower) Package", recommend:1, tower_num:5043,
			        paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:1, PID:"tower_atv_blue_summer_tower_package" , XSOLLA_PID:80},
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:55,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_blue_summer_soul_package" , XSOLLA_PID:81},

		//20260714_jhyu 까마귀 타워, 태식 패키지
		{title:"푸른 여름 패키지(타워)", title_en: "Blue Summer (Tower) Package", recommend:1, tower_num:5046,
					paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:1, PID:"tower_atv_blue_summer_tower_package" , XSOLLA_PID:80},
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:64,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_blue_summer_soul_package" , XSOLLA_PID:81},
					
		//20260702_jhyu 길드 스테이지 재선택 상품
		{title:"길드 버프 재선택권", 	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,
									paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:0, PID:"tower_atv_guild_buff_reroll_ticket", XSOLLA_PID:88, ITEMID_INDEX:3},
        {title:"길드 버프 재선택권(무제한)", 	gold:0,	ruby:0,	dia:0, rainbow:0, recommend:0,
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_guild_buff_reroll_ticket_unlimited", XSOLLA_PID:89}, 

		//20260623_jhyu 여름 나기 패키지
		{title:"푸른 여름 패키지(타워)", title_en: "Blue Summer (Tower) Package", recommend:1, tower_num:5040,
					paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:1, PID:"tower_atv_blue_summer_tower_package" , XSOLLA_PID:80},
		{title:"푸른 여름 패키지(영혼석)", title_en: "Blue Summer (Soul) Package", recommend:1, hero_num:52,
					paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_blue_summer_soul_package" , XSOLLA_PID:81},

		//20260615_dhlee 220스테이지 클리어 패키지 추가
		{title:"220스테이지 클리어 패키지(쉬움)", title_en: "220 Stage Clear Package(Easy)" , recommend:0,
			paywon:15000, paywon_withvat:16500, payusd:15.0, TAG:0, PID:"tower_atv_stage_220_clear_easy_package", XSOLLA_PID:84},
		{title:"220스테이지 클리어 패키지(보통)", title_en: "220 Stage Clear Package(Normal)" , recommend:0,
			paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_stage_220_clear_normal_package", XSOLLA_PID:85},
		{title:"220스테이지 클리어 패키지(어려움)", title_en: "220 Stage Clear Package(Hard)" , recommend:0,
			paywon:100000, paywon_withvat:110000, payusd:100.0, TAG:0, PID:"tower_atv_stage_220_clear_hard_package", XSOLLA_PID:86},
		
		//뱀여왕 패키지
		{title:"신화 영웅 패키지", title_en: "Mythic Hero Package", recommend:1, hero_num: 61,
			                        paywon:90000, paywon_withvat:99000, payusd:90.0, TAG:1, PID:"tower_atv_mythic_hero_package" , XSOLLA_PID:64},

		//신화 펜리르 패키지
		{title:"신화 영웅 패키지", title_en: "Mythic Hero Package", recommend:1, hero_num: 58,
									paywon:90000, paywon_withvat:99000, payusd:90.0, TAG:1, PID:"tower_atv_mythic_hero_package" , XSOLLA_PID:64},

		//20250702_jhyu 스테이지 패키지 쉬움
		{title:"스테이지 패키지(쉬움)", title_en: "Stage Package(Easy)" , recommend:0, stage_type: "eldorado",
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:0, PID:"tower_atv_stage_easy_package", XSOLLA_PID:65},
		//헬나이트 패키지
		{title:"신화 영웅 패키지", title_en: "Mythic Hero Package" , recommend:0, hero_num: 46,
									paywon:90000, paywon_withvat:99000, payusd:90.0, TAG:0, PID:"tower_atv_mythic_hero_package", XSOLLA_PID:64},
		//헬나이트 영혼석
		{title:"신화 영웅 영혼석 1개", title_en: "Mythic Hero Soul x1" , recommend:0, hero_num: 46,
									paywon:3000, paywon_withvat:3300, payusd:3.0, TAG:0, PID:"tower_atv_mythic_soul_x1", XSOLLA_PID:63},
		
		{title:"대박패키지",	title_en : "Package - Wow", gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:1,hero:[0,11,13,6],tower:[0,4005],		
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:1, PID:"tower_atv_pack_ohmygod" , XSOLLA_PID:18}, //계정당 

		
		{title:"아이템패키지", title_en:"Package - Item",			gold:0,	ruby:70,	dia:0,		rainbow:0, recommend:0,	item:[0,5,5,5,5,5], /*각 5개씩*/
									paywon:7000, paywon_withvat:7700, payusd:7.0, TAG:0, PID:"tower_atv_pack_item", XSOLLA_PID:17}, //하루3회구매가능		
		{title:"초보패키지", title_en:"Package - Newbie",	gold:0,	ruby:50,	dia:0,	rainbow:0,	recommend:1,
									tower:[0,1005,1008,2023,2017], //1회만 구매 가능, 레벨5이하일때만 구매가능, 5레벨이하 경험치 2배 //SS의 경우 엑솔라 결제이기 때문에 여기 정보 바뀌면 php(xsolla_ok_pay_reward_PACKAGE_beginner())함수 수정해 줘야 함.
									item:[0,10,10,2,3,10],paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_pack_start", XSOLLA_PID:11},

		{title:"일일패키지(골드)", title_en:"Package - Daily(Gold)",		gold:500000,	ruby:10,	dia:0,		rainbow:0,	recommend:0, //recommend 추천태그 붙일래(1), 먈래(0)	
									paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:0, PID:"tower_atv_pack_day_gold", XSOLLA_PID:15}, //TAG : 추천 태크, PID: gEntrix.item_id[]의 index임.
//AMO서비스에 보이지 않게 처리 함. 스크롤 때문에 4개만 보여지게 하기
		{title:"일일패키지(만능)", title_en:"Package - Daily(Cards)",		gold:0,			ruby:0,	dia:0,		rainbow:10, recommend:0,
									paywon:2000, paywon_withvat:2200, payusd:2.0, TAG:0, PID:"tower_atv_pack_day_card", XSOLLA_PID:16},	 
		
		//20260324_jhyu 상점 개편, 영웅 패키지 합체
		{title:"영웅패키지",	 title_en:"Package - Hero",gold:0,			ruby:0,	dia:0,		rainbow:0,	recommend:0,
									hero:[0,4,7,10,13,16,19,22,25],
									paywon:15000, paywon_withvat:16500, payusd:15.0, TAG:1, PID:"tower_atv_pack_hero", XSOLLA_PID:12}, //기간동안 1회만 구매	

		{title:"묶음패키지", title_en:"Package - Bundle",	gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:0,	
									paywon:15000, paywon_withvat:16500, payusd:15.0, TAG:1, PID:"tower_atv_pack_group", XSOLLA_PID:13},		
	];

	//20260324_jhyu 상점 개편, 패키지 분리
	DEFINE.MARKETSTORE_MAGIC =
	[	{},
		{title:"굴베이그 마력", title_en:"Package - magic1",	gold:0,	ruby:0,	dia:0,magic:10,		rainbow:0, recommend:1,num:1,	
									paywon:3000, paywon_withvat:3300, payusd:3.0, TAG:1, PID:"tower_atv_pack_magic_1", XSOLLA_PID:48}, //무한정 구매가능		
		{title:"굴베이그 마력", title_en:"Package - magic3",	gold:0,	ruby:0,	dia:0,magic:110,		rainbow:0, recommend:1,num:3,	
									paywon:30000, paywon_withvat:33000, payusd:30.0, TAG:1, PID:"tower_atv_pack_magic_3", XSOLLA_PID:50}, //무한정 구매가능		
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:500,	rainbow:0,	recommend:1,	num:4,	
									paywon:100000, paywon_withvat:110000, payusd:100.0,TAG:1, PID:"tower_atv_pack_magic_4",XSOLLA_PID:51}, //무한정 구입가능
	];

	//AMO,ATV의 경우 ITEM_INDEX 사용하지 않고 PID사용함.
	// 20220317_dblee Xsolla 결제 구현 - payusd , XSOLLA_PID추가
	DEFINE.MARKETSTORE_RUBY =
	[	{},
		// {title:"루비<br>11개",ruby:11,paywon:1000	,paywon_withvat:1100, payusd:1.0, TAG:0, PID:"tower_atv_ruby_1", XSOLLA_PID:1}, 
		{title:"루비<br>61개",ruby:61,paywon:5000	,paywon_withvat:5500, payusd:5.0, TAG:0, PID:"tower_atv_ruby_2", XSOLLA_PID:2},
		{title:"루비<br>130개",ruby:130,	paywon:9000 ,paywon_withvat:9900, payusd:9.0, TAG:0, PID:"tower_atv_ruby_3", XSOLLA_PID:3},
		{title:"루비<br>230개",ruby:230,	paywon:15000,paywon_withvat:16500,payusd:15.0, TAG:0, PID:"tower_atv_ruby_4", XSOLLA_PID:4},
		{title:"루비<br>560개",ruby:560,	paywon:30000,paywon_withvat:33000,payusd:30.0, TAG:0, PID:"tower_atv_ruby_5", XSOLLA_PID:9},
	];		
}

//20231014_ywlee GameHollywood 추가, 아래 상세 내용은 수정해야 함.
DEFINE.goods_GH = function()
{
	// 20220317_dblee Xsolla 결제 구현 - payusd , XSOLLA_PID. title_en추가
	DEFINE.MARKETSTORE_PACKAGE = //돈(won)을 지불하고 패키지를 구매한다.
	[   {},

		{title:"대박패키지",	 title_en : "Package - Wow" ,gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:1,hero:[0,11,13,6],tower:[0,4005],		
									paywon:30000, paywon_withvat:33000,payusd:30.0, TAG:1, PID:"tower_atv_pack_ohmygod" , XSOLLA_PID:18}, //계정당 1회구입가능
	
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:10,	rainbow:0,	recommend:1,	num:1,	
									paywon:3000, paywon_withvat:3300, payusd:3.0,TAG:1, PID:"tower_atv_pack_magic_1"}, //무한정 구입가능
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:110,	rainbow:0,	recommend:1,	num:3,	
									paywon:30000, paywon_withvat:33000, payusd:30.0,TAG:1, PID:"tower_atv_pack_magic_3"}, //무한정 구입가능
		{title:"굴베이그 마력",	gold:0,	ruby:0,	dia:0,magic:500,	rainbow:0,	recommend:1,	num:4,	
									paywon:100000, paywon_withvat:110000, payusd:100.0,TAG:1, PID:"tower_atv_pack_magic_4"}, //무한정 구입가능

		{title:"아이템패키지", title_en:"Package - Item",			gold:0,	ruby:70,	dia:0,		rainbow:0, recommend:0,	item:[0,5,5,5,5,5], /*각 5개씩*/
									paywon:7000, paywon_withvat:7700, payusd:7.0, TAG:0, PID:"tower_atv_pack_item", XSOLLA_PID:17}, //하루3회구매가능		
		{title:"초보패키지", title_en:"Package - Newbie",	gold:0,	ruby:50,	dia:0,	rainbow:0,	recommend:1,
									tower:[0,1005,1008,2023,2017], //1회만 구매 가능, 레벨5이하일때만 구매가능, 5레벨이하 경험치 2배 //SS의 경우 엑솔라 결제이기 때문에 여기 정보 바뀌면 php(xsolla_ok_pay_reward_PACKAGE_beginner())함수 수정해 줘야 함.
									item:[0,10,10,2,3,10],paywon:5000, paywon_withvat:5500, payusd:5.0, TAG:1, PID:"tower_atv_pack_start", XSOLLA_PID:11},

		{title:"일일패키지(골드)", title_en:"Package - Daily(Gold)",		gold:500000,	ruby:10,	dia:0,		rainbow:0,	recommend:0, //recommend 추천태그 붙일래(1), 먈래(0)	
									paywon:1000, paywon_withvat:1100, payusd:1.0, TAG:0, PID:"tower_atv_pack_day_gold", XSOLLA_PID:15}, //TAG : 추천 태크, PID: gEntrix.item_id[]의 index임.
//AMO서비스에 보이지 않게 처리 함. 스크롤 때문에 4개만 보여지게 하기
		{title:"일일패키지(만능)", title_en:"Package - Daily(Cards)",		gold:0,			ruby:0,	dia:0,		rainbow:10, recommend:0,
									paywon:2000, paywon_withvat:2200, payusd:2.0, TAG:0, PID:"tower_atv_pack_day_card", XSOLLA_PID:16},	 
	
		{title:"묶음패키지", title_en:"Package - Bundle",	gold:6000000,	ruby:100,	dia:7200,	rainbow:0,	recommend:0,
									due_start: "2022/05/11 00:00:00", //구매가능기간
									due_end  : "2022/05/12 03:00:00", //구매가능기간		
									paywon:15000, paywon_withvat:16500, payusd:15.0, TAG:1, PID:"tower_atv_pack_group", XSOLLA_PID:13},		
	];

	//AMO,ATV의 경우 ITEM_INDEX 사용하지 않고 PID사용함.
	// 20220317_dblee Xsolla 결제 구현 - payusd , XSOLLA_PID추가
	DEFINE.MARKETSTORE_RUBY =
	[	{},
		// {title:"루비<br>11개",ruby:11,paywon:1000	,paywon_withvat:1100, payusd:1.0, TAG:0, PID:"tower_atv_ruby_1", XSOLLA_PID:1}, 
		{title:"루비<br>61개",ruby:61,paywon:5000	,paywon_withvat:5500, payusd:5.0, TAG:0, PID:"tower_atv_ruby_2", XSOLLA_PID:2},
		{title:"루비<br>130개",ruby:130,	paywon:9000 ,paywon_withvat:9900, payusd:9.0, TAG:0, PID:"tower_atv_ruby_3", XSOLLA_PID:3},
		{title:"루비<br>230개",ruby:230,	paywon:15000,paywon_withvat:16500,payusd:15.0, TAG:0, PID:"tower_atv_ruby_4", XSOLLA_PID:4},
		{title:"루비<br>560개",ruby:560,	paywon:30000,paywon_withvat:33000,payusd:30.0, TAG:0, PID:"tower_atv_ruby_5", XSOLLA_PID:9},
	];		
}


var ATTACK_LEN = //공격거리 pixel로 나타내기
{
	VL : 10,    // 아주짧다		Very Low
	LO : 30,   // 짧다			Low
	MI : 80,   // 보통			Middle
	HI : 120,   // 길다			High
	VH : 200,  // 매우길다		Very High
}
var ATTACK_SPEED = //공격속도 초로 나타내기(대기시간) -- 타워는 Attact Wait (AW 로 표기) , 영웅,ally,지원병은 Attack Speed로 표기함.
{
	VL : 60,	// 아주느림		Very Low
	LO : 40,	// 느림			Low
	MI : 30,	// 보통			Middle
	HI : 20,	// 빠르다		High
	VH : 10,	// 매우빠르다	Very High
}

var PATH_MOVE_SPEED = //적군의 이동속도, path를 얼마나건너 뛸까의 정도이다.
{
	VVL:0.2,
	VL : 0.5,    // 아주느리다	Very Low	, path를 0.5간격으로 이동하게 된다.
	LO : 1,      // 느리다		Low			, path를 1 간격으로 이동한다.	 
	MI : 2,		 // 보통		Middle		, path를 2 간격으로 이동한다.
	HI : 4,		 // 빠르다		High		, path를 4 간격으로 이동한다.
	VH : 8,		 // 매우 빠르다	Very High	, path를 8 각녁으로 이동한다.
}


/*********************************************************************************/
/////////////////////////////////////////////////////////////////////////////////
//실제 소스 코드에 적용 되어야 하나 급박한 수정사항의 경우 여기에 우선 적용 한다.
/////////////////////////////////////////////////////////////////////////////////

window.addEventListener('load', function() 
{ 
	//GTD.min.js로 묶으면서 HCN_config.js파일을 재정의하여 사용 함.
	//if(glo.platform != glo.PLATFORM.HCN) temporary_run(); //HCN의 경우는 loading다하고 호출된다.	


	//우선 body.onload를 무력화 시키고 GTD.min.js를 로딩휴 Main.on_load를 호출하게 한다.
	document.body.onload = null;//기존에 index.html에 등록된 Main.on_load()호출을 삭제하고, min 파일 로딩이 완료되면 호출하는 것으로 수정함.

	//typeof 넣은 이유... glo is not defined EXE향에서
	if(typeof glo !== 'undefined' && glo.platform == glo.PLATFORM.HCN)
	{
		DEFINEJS_HCN_config(); //여기서 HCN_config.js파일 하는것 하고 로딩 할꺼 다하고 temporary_run()이 호출된다.
	}
	else if(typeof glo !== 'undefined' && glo.platform == glo.PLATFORM.CJH) //CJH도 HCN꺼 사용한다.
	{
		DEFINEJS_HCN_config(); //여기서 HCN_config.js파일 하는것 하고 로딩 할꺼 다하고 temporary_run()이 호출된다.
	}
	else
	{
		temporary_run(); //HCN의 경우는 loading다하고 호출된다.
	}

}, true);

var EMERGENCY = false; //긴급상황이면 true 해라.
function temporary_run()
{  	
	//20240808_ywlee 긴급상황일 경우 간단한 공지 보여주고 끝.
	if(EMERGENCY == true) //비상상황이면
	{
		var fname = 'http://211.253.26.47:8093/TOWERDEFENCE_AMO/GongJi/20240804_1/20240805_gtd_all_eng.png';

		switch(glo.platform)
		{
			case glo.PLATFORM.KT:
			case glo.PLATFORM.SKB:
			case glo.PLATFORM.CJH:
			case glo.PLATFORM.HCN:
			case glo.PLATFORM.DLIVE:
					fname = 'http://211.253.26.47:8093/TOWERDEFENCE_AMO/GongJi/20240804_1/20240805_gtd_all_kor.png';
		}
		var w = 804, h = 459;
		var div = document.getElementById("div_body");
		div.innerHTML = 	' <img id="emergency">';
		util.draw_image_no_wh_pos( 'emergency'	,fname	,(1280-w)/2,(720-h)/2);
		return;
	}

	//20230901_ywlee CDN서비를 위해
	if(CDN.SERVER_INDEX == 0) 
	{
		setTimeout(temporary_run,100);
		return;
	}

	//20231112_ywlee 배경에 까는 이미지가 body,div_body 두군데(여기, adjust)로 분리되어 있어, 여기서 한군데인 div_body로 통합함. 
	//화면전환시 마다 흰화면 보이는 현상을 막기위해 로고 배경 깔기 ( local에서 찾아 보고 실패하면 서버에서 찾기)
	//var fname1 = 'image/logo/intro_bg'+util.get_postfix_lang()+'_new.jpg'; //local
	// var fname1 = 'image/logo/intro_bg'+'_en'+'_new.jpg'; //local
	//20250304_jhyu 3주년 배경
	//20250624_jhyu 기봉이 배경
	//20250702_jhyu 난천 배경
	//20250702_jhyu 헬나이트 배경
	//20250924_jhyu 국화 시즌 배경
	//20251208_jhyu 대나무 시즌 배경
	//20260112_jhyu 늑대왕 배경
	//20260126_jhyu 순신 출시 배경
	//20260706_dhlee 오공 출시 배경
	var fname1 = 'image/logo/intro_bg_chuseok.jpg'; //local
	// var fname1 = 'image/logo/intro_bg_ogong.jpg'; //local
	var fname2 = CDN.server_list[CDN.SERVER_INDEX].img_url+fname1; //local에 없다면 cdn에서
	var myDiv = document.getElementById("div_body");
	var selectedImage = new Image();
	selectedImage.src = fname1;
	selectedImage.onload = function () 
	{
		myDiv.style.background = "url(" + fname1 + ") no-repeat 0 0";
	}
	selectedImage.onerror = function () 
	{
		myDiv.style.background = "url(" + fname2 + ") no-repeat 0 0";
	}


	//20220817_ywlee php data값 전송시 AES128bit  암호화 알고리즘 적용 을 위해 aes.js파일 로딩하기	
	var s = document.createElement('script');
	s.async		= false;
	s.type		= 'text/javascript';
	s.language	= 'javascript';
	//s.src		= 'http://211.253.26.47:8093/TOWERDEFENCE_COMMON/CRYPTO/aes.js';
	s.src		= CDN.server_list[CDN.SERVER_INDEX].aes_url;

	document.body.appendChild(s);
	s.onload = function() { /*util.log("aes.js loading complete")*/};
	s.onerror = function(){S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.NETWORK_ERROR,"aes.js loading faild!");}


	//min파일 불러오는 것으로 전체 변경------------------------------------- 	
	var min = document.createElement('script');
	min.async		= false;
	min.type		= 'text/javascript';
	min.language	= 'javascript';
	
	//20250326_ywlee 서버과부하를 피하기위해 한국의 min, 및 image 서버를 다른곳 211.253.26.47:8094 로 보냄. 하지만 DLIVE,CJH,HCN등은 포워딩 못했기에 기존꺼유지 하기 위해 아래 코드 넣음.
	if (typeof glo !== "undefined") //glo가 정의되 있다면 -- skb는 이 시점에 glo가 undefined 나옴.
	{
		switch(glo.platform)
		{
			case glo.PLATFORM.TOSS: //20251128_jhyu 토스 플랫폼 추가
			case glo.PLATFORM.DLIVE:
			case glo.PLATFORM.CJH:
			case glo.PLATFORM.HCN:
			case glo.PLATFORM.AMO: //?
					CDN.server_list[CDN.SERVER_INDEX] =
					{						
						server_name	: "한국서버", 
						ping_url		: "http://211.253.26.47:8093/ping.php",
						min_src			: "http://211.253.26.47:8093/TOWERDEFENCE_COMMON/min/"+gLIVE_MIN,		
						aes_url			: "http://211.253.26.47:8093/TOWERDEFENCE_COMMON/CRYPTO/aes.js",
						img_url			: "http://211.253.26.47:8093/TOWERDEFENCE_COMMON/TOT/", //image가 있는 디렉토리
						path_url		: "http://211.253.26.47:8093/TOWERDEFENCE_COMMON/TOT/javascript/path_data/",
						pvp_url			: "ws://14.49.36.116",
						sound_url		: "http://211.253.26.47:8093/TOWERDEFENCE_COMMON/TOT/sound/", //sound						
					}
					break;
			default:
					//나머지 플랫폼은 CDN의 data를 따른다.
					break;
		}
	}

	min.src		= CDN.server_list[CDN.SERVER_INDEX].min_src;

  
if(1) //실제 서비스 시에는 1이어여 함.
{
	document.body.appendChild(min);
	min.onload = function() 
	{
		DEFINE.on_load_after(); //GTD.min.js파일 로딩후 추리해야 하는 것들

		Main.on_load();
		util.log("GTD.min.js loading complete");
	};
	min.onerror = function(){S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.NETWORK_ERROR,min.src+" loading faild!");}
}
else
{
	//테스트(로컬)일때는 이거 로딩
	DEFINE.on_load_after(); //GTD.min.js파일 로딩후 추리해야 하는 것들
	Main.on_load();
}

}

//GTD.min.js파일 로딩후 추리해야 하는 것들
DEFINE.on_load_after = function()
{
	switch(glo.platform)
	{
		//20251128_jhyu 토스 플랫폼 추가
		case glo.PLATFORM.TOSS : 
				//glo.predefine.pvp_comming_soon	= true; //PVP를 커밍순 처리 하자. //20220316에 open함.
				glo.enable_coupon = 1; //쿠폰입력창 활성화, 활성화	
				glo.enable_mobile_connect = 1; //모바일 연동 지원 (default:0 지원안함)
				glo.enable_gacha_mileage = 1;	  //20221016_ywlee 뽑기 마일리지 추가
				glo.enable_hero5_fire = 1; //20230504_ywlee 5명의 영웅 출전 가능하게
				glo.enable_guild = 1; //20230723_ywlee 길드추가(1:길드활성화, 0:길드없음)
				glo.enable_awake = 1; //20231005_twkim 영웅초월추가(1:초월활성화, 0:초월없음)
				glo.enable_guild_boss = 1; //20231102_twkim 길드보스 추가(1:활성화, 0:없음)
				glo.enable_event_menu = 1; //20231211_twkim 이벤트 전용메뉴 추가(1:활성화, 0:없음)
				glo.enable_ad_new = 1; //20231222_ywlee AMO광고개편 할때 사용함.
				glo.enable_prooftop_new = 1; //20231218_ywlee 증명의 탑 2024년 1월1일 부터 1의 값을 가진다.(1:새로운점수및 맵, 0:기존)
				glo.enable_renewal_monthly_package = 1; //20240109_twkim 정기구독패키지 개편 이거 킬때 goods에서 월정액은 닫고, 정기구독 패키지를 열어준다.
				glo.enable_free_ticket = 0; //20240116_twkim 무료티켓 추가(1:활성화, 0:없음)
				glo.enable_travel = 0; //20240209_twkim 탐사 퀘스트 추가(1:활성화, 0:없음)
				glo.enable_playwon_ad = 0; //20250110_twkim 플레이윈 광고 추가(1:활성화, 0:없음)
				glo.enable_myths = 1; //20250304_twkim 신화단계 영웅 관련한 새로운 UI 추가(1:활성화, 0:없음)
				glo.enable_honeygain = 0;	//20250528_jhyu 허니게인 인덱싱 추가
				glo.enable_server2 = 0;//20250707_ywlee GTD서버2제작
				glo.enable_guild_entry = 1;	//20250903_jhyu 길드 입장 (1:입장가능, 0:불가능)
				glo.enable_boss_pvp_entry = 1;	//20251027_jhyu 보스 pvp (:활성화,0:없음)
				glo.enable_guild_expel = 1;	//20250105_jhyu 길드 탈퇴, 추방 버튼 활성화 (1:탈퇴가능,0:불가능)
				glo.enable_user_vaild_popup = 1;	//20260225_jhyu 사용자 확인 코드 활성화 (1:인증 팝업 띄움, 0:안띄움)
				glo.enable_limit_pvp_entry = 1;	//20260409_jhyu 제한된 pvp 추가 (1:활성화,0:없음)
				glo.enable_guild_stage = 1;	//20260415_jhyu 길드 스테이지 추가 (1:활성화,0:없음)
				glo.enable_guild_territory = 1;	//20260724_jhyu 길드 영지전 추가 (1:활성화,0:없음)

				DEFINE.TOWER_SORT_NUM = 16; //20240306_twkim 수녀타워 추가 (9:활성화 ,8: 없음)   -- 기존의 S_charbook.TOWER_SORT_NUM 을 대체 하여, 여기서 조절할 수 있게 한다.
				DEFINE.SERVICE_MAX_STAGE = 220;  //140스테이지 론칭후에는 이거 주석 풀고, 위에줄 지우기	

				//골타디PVP전용서버사용함. - //20231012_ywlee 각 리전별 PVP서버 생성
				WSS.URL = CDN.server_list[CDN.SERVER_INDEX].pvp_url;
				WSS.PORT = 10001;  //10000, 10001 toggle 사용
				WSS.PORT_BOSS = 10000;	//20251027_jhyu 보스전 pvp용으로 고정 사용

				//glo.predefine.trace_scene_flag	= true; //시나리오를 추적하자.
				//glo.predefine.trace_key_flag	= true; //key입력을 추적하자.
				//glo.predefine.trace_uniq_id	= "TDM21063"; //추적할 uniq_id는 all이다.	
				break;

		case glo.PLATFORM.AMO : 
				//glo.predefine.pvp_comming_soon	= true; //PVP를 커밍순 처리 하자. //20220316에 open함.
				glo.enable_coupon = 1; //쿠폰입력창 활성화, 활성화	
				glo.enable_mobile_connect = 1; //모바일 연동 지원 (default:0 지원안함)
				glo.enable_gacha_mileage = 1;	  //20221016_ywlee 뽑기 마일리지 추가
				glo.enable_hero5_fire = 1; //20230504_ywlee 5명의 영웅 출전 가능하게
				glo.enable_guild = 1; //20230723_ywlee 길드추가(1:길드활성화, 0:길드없음)
				glo.enable_awake = 1; //20231005_twkim 영웅초월추가(1:초월활성화, 0:초월없음)
				glo.enable_guild_boss = 1; //20231102_twkim 길드보스 추가(1:활성화, 0:없음)
				glo.enable_event_menu = 1; //20231211_twkim 이벤트 전용메뉴 추가(1:활성화, 0:없음)
				glo.enable_ad_new = 1; //20231222_ywlee AMO광고개편 할때 사용함.
				glo.enable_prooftop_new = 1; //20231218_ywlee 증명의 탑 2024년 1월1일 부터 1의 값을 가진다.(1:새로운점수및 맵, 0:기존)
				glo.enable_renewal_monthly_package = 1; //20240109_twkim 정기구독패키지 개편 이거 킬때 goods에서 월정액은 닫고, 정기구독 패키지를 열어준다.
				glo.enable_free_ticket = 0; //20240116_twkim 무료티켓 추가(1:활성화, 0:없음)
				glo.enable_travel = 0; //20240209_twkim 탐사 퀘스트 추가(1:활성화, 0:없음)
				glo.enable_playwon_ad = 0; //20250110_twkim 플레이윈 광고 추가(1:활성화, 0:없음)
				glo.enable_myths = 1; //20250304_twkim 신화단계 영웅 관련한 새로운 UI 추가(1:활성화, 0:없음)
				glo.enable_honeygain = 0;	//20250528_jhyu 허니게인 인덱싱 추가
				glo.enable_server2 = 0;//20250707_ywlee GTD서버2제작
				glo.enable_guild_entry = 1;	//20250903_jhyu 길드 입장 (1:입장가능, 0:불가능)
				glo.enable_boss_pvp_entry = 1;	//20251027_jhyu 보스 pvp (:활성화,0:없음)
				glo.enable_guild_expel = 1;	//20250105_jhyu 길드 탈퇴, 추방 버튼 활성화 (1:탈퇴가능,0:불가능)
				glo.enable_user_vaild_popup = 1;	//20260225_jhyu 사용자 확인 코드 활성화 (1:인증 팝업 띄움, 0:안띄움)
				glo.enable_limit_pvp_entry = 1;	//20260409_jhyu 제한된 pvp 추가 (1:활성화,0:없음)
				glo.enable_guild_stage = 1;	//20260415_jhyu 길드 스테이지 추가 (1:활성화,0:없음)
				glo.enable_more_games = 1;	//20260706_jhyu 다른 게임 버튼 추가 (1:활성화,0:없음)
				glo.enable_guild_territory = 1;	//20260724_jhyu 길드 영지전 추가 (1:활성화,0:없음)

				DEFINE.TOWER_SORT_NUM = 16; //20240306_twkim 수녀타워 추가 (9:활성화 ,8: 없음)   -- 기존의 S_charbook.TOWER_SORT_NUM 을 대체 하여, 여기서 조절할 수 있게 한다.
				DEFINE.SERVICE_MAX_STAGE = 220;  //140스테이지 론칭후에는 이거 주석 풀고, 위에줄 지우기	
				

				//골타디PVP전용서버사용함. - //20231012_ywlee 각 리전별 PVP서버 생성
				WSS.URL = CDN.server_list[CDN.SERVER_INDEX].pvp_url;
				WSS.PORT = 10001;  //10000, 10001 toggle 사용
				WSS.PORT_BOSS = 10000;	//20251027_jhyu 보스전 pvp용으로 고정 사용

				//glo.predefine.trace_scene_flag	= true; //시나리오를 추적하자.
				//glo.predefine.trace_key_flag	= true; //key입력을 추적하자.
				//glo.predefine.trace_uniq_id	= "TDM21063"; //추적할 uniq_id는 all이다.	
				break;
		case glo.PLATFORM.SKB:
				//20220506_ywlee : SKB최경남 매니저 요청으로 30만원에서 50만원으로 상향조정함.							
				DEFINE.MONTH_MAX_PAYMENT = 0;	 //일반적으로 SKB는 30만원, 고포류는 50만원 , 서버의 PAY_LIMIT Table에 기록되면 결제한도 조정됨.
				glo.enable_coupon = 1; //쿠폰입력창  활성화		 
				glo.enable_mobile_connect = 1; //모바일 연동 지원 (default:0 지원안함) 		
				glo.enable_gacha_mileage = 1;	  //20221016_ywlee 뽑기 마일리지 추가
				glo.enable_hero5_fire = 1; //20230504_ywlee 5명의 영웅 출전 가능하게
				glo.enable_guild = 1; //20230723_ywlee 길드추가(1:길드활성화, 0:길드없음)
				glo.enable_awake = 1; //20231005_twkim 영웅초월추가(1:초월활성화, 0:초월없음)
				glo.enable_guild_boss = 1; //20231102_twkim 길드보스 추가(1:활성화, 0:없음)
				glo.enable_event_menu = 1; //20231211_twkim 이벤트 전용메뉴 추가(1:활성화, 0:없음)
				glo.enable_ad_new = 0; //20231222_ywlee AMO광고개편 할때 사용함. 이거는 항상 0이어야 함.
				glo.enable_prooftop_new = 1; //20231218_ywlee 증명의 탑 2024년 1월1일 부터 1의 값을 가진다.(1:새로운점수및 맵, 0:기존)
				glo.enable_renewal_monthly_package = 1; //20240109_twkim 정기구독패키지 개편 이거 킬때 goods에서 월정액은 닫고, 정기구독 패키지를 열어준다.
				glo.enable_free_ticket = 0; //20240116_twkim 무료티켓 추가(1:활성화, 0:없음)
				glo.enable_travel = 0; //20240209_twkim 탐사 퀘스트 추가(1:활성화, 0:없음)
				glo.enable_playwon_ad = 0; //20250110_twkim 플레이윈 광고 추가(1:활성화, 0:없음)
				glo.enable_myths = 1; //20250304_twkim 신화단계 영웅 관련한 새로운 UI 추가(1:활성화, 0:없음)
				glo.enable_honeygain = 0;	//20250528_jhyu 허니게인 인덱싱 추가
				glo.enable_server2 = 0;//20250707_ywlee GTD서버2제작
				glo.enable_guild_entry = 1;	//20250903_jhyu 길드전장 입장 (1:입장가능, 0:불가능)
				glo.enable_boss_pvp_entry = 1;	//20251027_jhyu 보스 pvp (:활성화,0:없음)
				glo.enable_guild_expel = 1;	//20250105_jhyu 길드 탈퇴, 추방 버튼 활성화 (1:탈퇴가능,0:불가능)
				glo.enable_user_vaild_popup = 1;	//20260225_jhyu 사용자 확인 코드 활성화 (1:인증 팝업 띄움, 0:안띄움)
				glo.enable_limit_pvp_entry = 1;	//20260409_jhyu 제한된 pvp 추가 (1:활성화,0:없음)
				glo.enable_guild_stage = 1;	//20260415_jhyu 길드 스테이지 추가 (1:활성화,0:없음)
				glo.enable_guild_territory = 1;	//20260724_jhyu 길드 영지전 추가 (1:활성화,0:없음)

				DEFINE.TOWER_SORT_NUM = 16; //20240306_twkim 수녀타워 추가 (9:활성화 ,8: 없음)   -- 기존의 S_charbook.TOWER_SORT_NUM 을 대체 하여, 여기서 조절할 수 있게 한다.
				DEFINE.SERVICE_MAX_STAGE = 220;  //140스테이지 론칭후에는 이거 주석 풀고, 위에줄 지우기			

				//WSS.URL = "ws://211.253.26.47";
				//WSS.PORT = 50240;

				//골타디PVP전용서버사용함. -- 국내는 그대로 하자 (SKB,KT,HCN)
				WSS.URL = "ws://14.49.36.116";
				WSS.PORT = 10001;  //10000, 10001 toggle 사용 
				WSS.PORT_BOSS = 10000;	//20251027_jhyu 보스전 pvp용으로 고정 사용
				break;

		case glo.PLATFORM.ATV:

				//골타디PVP전용서버사용함. - //20231012_ywlee 각 리전별 PVP서버 생성
				WSS.URL = CDN.server_list[CDN.SERVER_INDEX].pvp_url;
				WSS.PORT = 10001;  //10000, 10001 toggle 사용
				WSS.PORT_BOSS = 10000;	//20251027_jhyu 보스전 pvp용으로 고정 사용

				//신규버전 출시하면 아래 4줄 주석 풀고, 1,2,3 모두 삭제 할 것.	그리고 해당 함수들도 삭제 할 것
				//glo.predefine.trace_scene_flag	= true; //시나리오를 추적하자.
				//glo.predefine.trace_key_flag	= true; //key입력을 추적하자.
				glo.predefine.trace_uniq_id		= "ATV76052"; //추적할 uniq_id는 all이다.
				//glo.predefine.pvp_comming_soon	= true; //PVP를 커밍순 처리 하자.

				//pvp 베타버전 오픈이면 pvp진입가능하게하고, 보상문구제거하고, 우하단 보상문구 제거
				//만약 정식 open되면 아래 모두 주석 처리 하고 위 pvp_comming_soon을 fals로만 하면 됨.

				glo.enable_coupon = 1; //쿠폰입력창  활성화	   (default: 비활성화임)	 				
				glo.enable_mobile_connect = 1; //모바일 연동 지원 (default:0 지원안함)
				glo.enable_gacha_mileage = 1;	  //20221016_ywlee 뽑기 마일리지 추가
				glo.enable_hero5_fire = 1; //20230504_ywlee 5명의 영웅 출전 가능하게
				glo.enable_guild = 1; //20230723_ywlee 길드추가(1:길드활성화, 0:길드없음)
				glo.enable_awake = 1; //20231005_twkim 영웅초월추가(1:초월활성화, 0:초월없음)
				glo.enable_guild_boss = 1; //20231102_twkim 길드보스 추가(1:활성화, 0:없음)
				glo.enable_event_menu = 1; //20231211_twkim 이벤트 전용메뉴 추가(1:활성화, 0:없음)
				glo.enable_ad_new = 0; //20231222_ywlee AMO광고개편 할때 사용함. 이거는 항상 0이어야 함.
				glo.enable_prooftop_new = 1; //20231218_ywlee 증명의 탑 2024년 1월1일 부터 1의 값을 가진다.(1:새로운점수및 맵, 0:기존)
				glo.enable_renewal_monthly_package = 1; //20240109_twkim 정기구독패키지 개편 이거 킬때 goods에서 월정액은 닫고, 정기구독 패키지를 열어준다.
				glo.enable_free_ticket = 0; //20240116_twkim 무료티켓 추가(1:활성화, 0:없음)
				glo.enable_travel = 0; //20240209_twkim 탐사 퀘스트 추가(1:활성화, 0:없음)
				glo.enable_playwon_ad = 0; //20250110_twkim 플레이윈 광고 추가(1:활성화, 0:없음)
				glo.enable_myths = 1; //20250304_twkim 신화단계 영웅 관련한 새로운 UI 추가(1:활성화, 0:없음)
				glo.enable_honeygain = 0;	//20250528_jhyu 허니게인 인덱싱 추가
				glo.enable_server2 = 0;//20250707_ywlee GTD서버2제작
				glo.enable_guild_entry = 1;	//20250903_jhyu 길드전장 입장 (1:입장가능, 0:불가능)
				glo.enable_boss_pvp_entry = 1;	//20251027_jhyu 보스 pvp (:활성화,0:없음)
				glo.enable_guild_expel = 1;	//20250105_jhyu 길드 탈퇴, 추방 버튼 활성화 (1:탈퇴가능,0:불가능)
				glo.enable_user_vaild_popup = 1;	//20260225_jhyu 사용자 확인 코드 활성화 (1:인증 팝업 띄움, 0:안띄움)
				glo.enable_limit_pvp_entry = 1;	//20260409_jhyu 제한된 pvp 추가 (1:활성화,0:없음)
				glo.enable_guild_stage = 1;	//20260415_jhyu 길드 스테이지 추가 (1:활성화,0:없음)
				glo.enable_more_games = 1;	//20260706_jhyu 다른 게임 버튼 추가 (1:활성화,0:없음)
				glo.enable_guild_territory = 1;	//20260724_jhyu 길드 영지전 추가 (1:활성화,0:없음)

				DEFINE.TOWER_SORT_NUM = 16; //20240306_twkim 수녀타워 추가 (9:활성화 ,8: 없음)   -- 기존의 S_charbook.TOWER_SORT_NUM 을 대체 하여, 여기서 조절할 수 있게 한다.
				DEFINE.SERVICE_MAX_STAGE = 220;  //140스테이지 론칭후에는 이거 주석 풀고, 위에줄 지우기	
				break;

		case glo.PLATFORM.KT:		
				//glo.predefine.pvp_comming_soon	= true; //PVP를 커밍순 처리 하자. //20220316에 open함.

				DEFINE.blink_del(); //focus깜빡임을 없앤다.
				//glo.AUTOTEST = 1; //자동테스트를 on한다. //실제 release 및 QA입고시에는 자동 test off할것
				PHP.IS_PING_CHECK = false;
				glo.enable_coupon = 1; //쿠폰입력창  활성화	   		    
				glo.enable_mobile_connect = 1; //모바일 연동 지원 (default:0 지원안함)//20220919부터 모바일 연동 지원함. 	
				glo.enable_gacha_mileage = 1;	  //20221016_ywlee 뽑기 마일리지 추가
				glo.enable_hero5_fire = 1; //20230504_ywlee 5명의 영웅 출전 가능하게
				glo.enable_guild = 1; //20230723_ywlee 길드추가(1:길드활성화, 0:길드없음) //67023700670
				glo.enable_awake = 1; //20231005_twkim 영웅초월추가(1:초월활성화, 0:초월없음)
				glo.enable_guild_boss = 1; //20231102_twkim 길드보스 추가(1:활성화, 0:없음)
				glo.enable_event_menu = 1; //20231211_twkim 이벤트 전용메뉴 추가(1:활성화, 0:없음)
				glo.enable_ad_new = 0; //20231222_ywlee AMO광고개편 할때 사용함. 이거는 항상 0이어야 함.
				glo.enable_prooftop_new = 1; //20231218_ywlee 증명의 탑 2024년 1월1일 부터 1의 값을 가진다.(1:새로운점수및 맵, 0:기존)
				glo.enable_renewal_monthly_package = 0; //20240109_twkim 정기구독패키지 개편 이거 킬때 goods에서 월정액은 닫고, 정기구독 패키지를 열어준다.
				glo.enable_free_ticket = 0; //20240116_twkim 무료티켓 추가(1:활성화, 0:없음)
				glo.enable_travel = 0; //20240209_twkim 탐사 퀘스트 추가(1:활성화, 0:없음)
				glo.enable_playwon_ad = 0; //20250110_twkim 플레이윈 광고 추가(1:활성화, 0:없음)
				glo.enable_myths = 1; //20250304_twkim 신화단계 영웅 관련한 새로운 UI 추가(1:활성화, 0:없음)
				glo.enable_honeygain = 0;	//20250528_jhyu 허니게인 인덱싱 추가
				glo.enable_server2 = 0;//20250707_ywlee GTD서버2제작
				glo.enable_guild_entry = 1;	//20250903_jhyu 길드전장 입장 (1:입장가능, 0:불가능)
				glo.enable_boss_pvp_entry = 1;	//20251027_jhyu 보스 pvp (:활성화,0:없음)
				glo.enable_guild_expel = 1;	//20250105_jhyu 길드 탈퇴, 추방 버튼 활성화 (1:탈퇴가능,0:불가능)
				glo.enable_user_vaild_popup = 1;	//20260225_jhyu 사용자 확인 코드 활성화 (1:인증 팝업 띄움, 0:안띄움)
				glo.enable_limit_pvp_entry = 1;	//20260409_jhyu 제한된 pvp 추가 (1:활성화,0:없음)
				glo.enable_guild_stage = 1;	//20260415_jhyu 길드 스테이지 추가 (1:활성화,0:없음)
				glo.enable_guild_territory = 1;	//20260724_jhyu 길드 영지전 추가 (1:활성화,0:없음)

				DEFINE.TOWER_SORT_NUM = 16; //20240306_twkim 수녀타워 추가 (9:활성화 ,8: 없음)   -- 기존의 S_charbook.TOWER_SORT_NUM 을 대체 하여, 여기서 조절할 수 있게 한다.
				DEFINE.SERVICE_MAX_STAGE = 220;  //140스테이지 론칭후에는 이거 주석 풀고, 위에줄 지우기	

				//골타디PVP전용서버사용함. -- 국내는 그대로 하자. (SKB,KT,HCN)
				WSS.URL = "ws://14.49.36.116";
				WSS.PORT = 10001;  //10000, 10001 toggle 사용	 
				WSS.PORT_BOSS = 10000;	//20251027_jhyu 보스전 pvp용으로 고정 사용
				break;

		case glo.PLATFORM.SS: 	
				//glo.predefine.pvp_comming_soon	= true; //PVP를 커밍순 처리 하자.

				//골타디PVP전용서버사용함. - //20231012_ywlee 각 리전별 PVP서버 생성
				WSS.URL = CDN.server_list[CDN.SERVER_INDEX].pvp_url;
				WSS.PORT = 10001;  //10000, 10001 toggle 사용
				WSS.PORT_BOSS = 10000;	//20251027_jhyu 보스전 pvp용으로 고정 사용

				glo.enable_coupon = 1; //쿠폰입력창  활성화	 
				glo.enable_mobile_connect = 1; //모바일 연동 지원 (default:0 지원안함)	 
				glo.enable_gacha_mileage = 1;	  //20221016_ywlee 뽑기 마일리지 추가
				glo.enable_hero5_fire = 1; //20230504_ywlee 5명의 영웅 출전 가능하게
				glo.enable_guild = 1; //20230723_ywlee 길드추가(1:길드활성화, 0:길드없음)
				glo.enable_awake = 1; //20231005_twkim 영웅초월추가(1:초월활성화, 0:초월없음)
				glo.enable_guild_boss = 1; //20231102_twkim 길드보스 추가(1:활성화, 0:없음)
				glo.enable_event_menu = 1; //20231211_twkim 이벤트 전용메뉴 추가(1:활성화, 0:없음)
				glo.enable_ad_new = 0; //20231222_ywlee AMO광고개편 할때 사용함. 이거는 항상 0이어야 함.
				glo.enable_prooftop_new = 1; //20231218_ywlee 증명의 탑 2024년 1월1일 부터 1의 값을 가진다.(1:새로운점수및 맵, 0:기존)
				glo.enable_renewal_monthly_package = 1; //20240109_twkim 정기구독패키지 개편 이거 킬때 goods에서 월정액은 닫고, 정기구독 패키지를 열어준다.
				glo.enable_free_ticket = 0; //20240116_twkim 무료티켓 추가(1:활성화, 0:없음)
				glo.enable_travel = 0; //20240209_twkim 탐사 퀘스트 추가(1:활성화, 0:없음)
				glo.enable_playwon_ad = 0; //20250110_twkim 플레이윈 광고 추가(1:활성화, 0:없음)
				glo.enable_myths = 1; //20250304_twkim 신화단계 영웅 관련한 새로운 UI 추가(1:활성화, 0:없음)
				glo.enable_honeygain = 0;	//20250528_jhyu 허니게인 인덱싱 추가
				glo.enable_server2 = 0;//20250707_ywlee GTD서버2제작
				glo.enable_guild_entry = 1;	//20250903_jhyu 길드전장 입장 (1:입장가능, 0:불가능)
				glo.enable_boss_pvp_entry = 1;	//20251027_jhyu 보스 pvp (:활성화,0:없음)
				glo.enable_guild_expel = 1;	//20250105_jhyu 길드 탈퇴, 추방 버튼 활성화 (1:탈퇴가능,0:불가능)
				glo.enable_user_vaild_popup = 1;	//20260225_jhyu 사용자 확인 코드 활성화 (1:인증 팝업 띄움, 0:안띄움)
				glo.enable_limit_pvp_entry = 1;	//20260409_jhyu 제한된 pvp 추가 (1:활성화,0:없음)
				glo.enable_guild_stage = 1;	//20260415_jhyu 길드 스테이지 추가 (1:활성화,0:없음)
				glo.enable_more_games = 1;	//20260706_jhyu 다른 게임 버튼 추가 (1:활성화,0:없음)
				glo.enable_guild_territory = 1;	//20260724_jhyu 길드 영지전 추가 (1:활성화,0:없음)

				DEFINE.TOWER_SORT_NUM = 16; //20240306_twkim 수녀타워 추가 (9:활성화 ,8: 없음)   -- 기존의 S_charbook.TOWER_SORT_NUM 을 대체 하여, 여기서 조절할 수 있게 한다.
				DEFINE.SERVICE_MAX_STAGE = 220;  //140스테이지 론칭후에는 이거 주석 풀고, 위에줄 지우기	
				break;

		case glo.PLATFORM.LG: 	
				//glo.predefine.pvp_comming_soon	= true; //PVP를 커밍순 처리 하자.
			
				//골타디PVP전용서버사용함. - //20231012_ywlee 각 리전별 PVP서버 생성
				WSS.URL = CDN.server_list[CDN.SERVER_INDEX].pvp_url;
				WSS.PORT = 10001;  //10000, 10001 toggle 사용
				WSS.PORT_BOSS = 10000;	//20251027_jhyu 보스전 pvp용으로 고정 사용


				glo.enable_coupon = 1; //쿠폰입력창  활성화	  
				glo.enable_mobile_connect = 1; //모바일 연동 지원 (default:0 지원안함)
				glo.enable_gacha_mileage = 1;	  //20221016_ywlee 뽑기 마일리지 추가
				glo.enable_hero5_fire = 1; //20230504_ywlee 5명의 영웅 출전 가능하게
				glo.enable_guild = 1; //20230723_ywlee 길드추가(1:길드활성화, 0:길드없음)
				glo.enable_awake = 1; //20231005_twkim 영웅초월추가(1:초월활성화, 0:초월없음)
				glo.enable_guild_boss = 1; //20231102_twkim 길드보스 추가(1:활성화, 0:없음)
				glo.enable_event_menu = 1; //20231211_twkim 이벤트 전용메뉴 추가(1:활성화, 0:없음)
				glo.enable_ad_new = 0; //20231222_ywlee AMO광고개편 할때 사용함. 이거는 항상 0이어야 함.
				glo.enable_prooftop_new = 1; //20231218_ywlee 증명의 탑 2024년 1월1일 부터 1의 값을 가진다.(1:새로운점수및 맵, 0:기존)
				glo.enable_renewal_monthly_package = 1; //20240109_twkim 정기구독패키지 개편 이거 킬때 goods에서 월정액은 닫고, 정기구독 패키지를 열어준다.
				glo.enable_free_ticket = 0; //20240116_twkim 무료티켓 추가(1:활성화, 0:없음)
				glo.enable_travel = 0; //20240209_twkim 탐사 퀘스트 추가(1:활성화, 0:없음)
				glo.enable_playwon_ad = 0; //20250110_twkim 플레이윈 광고 추가(1:활성화, 0:없음)
				glo.enable_myths = 1; //20250304_twkim 신화단계 영웅 관련한 새로운 UI 추가(1:활성화, 0:없음)
				glo.enable_honeygain = 0;	//20250528_jhyu 허니게인 인덱싱 추가
				glo.enable_server2 = 0;//20250707_ywlee GTD서버2제작
				glo.enable_guild_entry = 1;	//20250903_jhyu 길드전장 입장 (1:입장가능, 0:불가능)
				glo.enable_boss_pvp_entry = 1;	//20251027_jhyu 보스 pvp (:활성화,0:없음)
				glo.enable_guild_expel = 1;	//20250105_jhyu 길드 탈퇴, 추방 버튼 활성화 (1:탈퇴가능,0:불가능)
				glo.enable_user_vaild_popup = 1;	//20260225_jhyu 사용자 확인 코드 활성화 (1:인증 팝업 띄움, 0:안띄움)
				glo.enable_limit_pvp_entry = 1;	//20260409_jhyu 제한된 pvp 추가 (1:활성화,0:없음)
				glo.enable_guild_stage = 1;	//20260415_jhyu 길드 스테이지 추가 (1:활성화,0:없음)
				glo.enable_more_games = 1;	//20260706_jhyu 다른 게임 버튼 추가 (1:활성화,0:없음)
				glo.enable_guild_territory = 1;	//20260724_jhyu 길드 영지전 추가 (1:활성화,0:없음)

//				if(glo.version == "TD_LG_20221010") DEFINE.SERVICE_MAX_STAGE =	 100;//QA-20220916
//				if(glo.version == "TD_LG_20221010") WSS.PORT = 50241; //0916버전부터는 최신 PVP맵확장(증명의탑포함) 모두 되어 있다.(15map,해머O)

				DEFINE.TOWER_SORT_NUM = 16; //20240306_twkim 수녀타워 추가 (9:활성화 ,8: 없음)   -- 기존의 S_charbook.TOWER_SORT_NUM 을 대체 하여, 여기서 조절할 수 있게 한다.
				DEFINE.SERVICE_MAX_STAGE = 220;  //140스테이지 론칭후에는 이거 주석 풀고, 위에줄 지우기

				//glo.predefine.trace_scene_flag	= true; //시나리오를 추적하자.
				//glo.predefine.trace_key_flag		=  true; //key입력을 추적하자.
				//glo.predefine.trace_uniq_id	= "GTDLG_269070"; //추적할 uniq_id는 all이다.
				break;

		case glo.PLATFORM.HCN:

				glo.URL_prefix = gSERVER_URL+"/TOWERDEFENCE_HCN/"; //HCN의 경우는 HCN_config.js파일에서 glo.URL_prefix를 정한다.

				//glo.predefine.trace_scene_flag	= true; //시나리오를 추적하자.
				//glo.predefine.trace_key_flag		= true; //key입력을 추적하자.
				//glo.predefine.trace_uniq_id		= "HCN00010003983	"; //추적할 uniq_id는 all이다.

				//골타디PVP전용서버사용함. --> HCN은 전용서버 사용하면 안됨!! port 열어줘야 함.
				WSS.URL = "ws://14.49.36.116";
				WSS.PORT = 10001;  //10000, 10001 toggle 사용
				WSS.PORT_BOSS = 10000;	//20251027_jhyu 보스전 pvp용으로 고정 사용

				glo.enable_coupon = 1; //쿠폰입력창  활성화	   
				glo.enable_mobile_connect = 1; //모바일 연동 지원 (default:0 지원안함) 
				glo.enable_gacha_mileage = 1;	  //20221016_ywlee 뽑기 마일리지 추가
				glo.enable_hero5_fire = 1; //20230504_ywlee 5명의 영웅 출전 가능하게
				glo.enable_guild = 1; //20230723_ywlee 길드추가(1:길드활성화, 0:길드없음)
				glo.enable_awake = 1; //20231005_twkim 영웅초월추가(1:초월활성화, 0:초월없음)
				glo.enable_guild_boss = 1; //20231102_twkim 길드보스 추가(1:활성화, 0:없음)
				glo.enable_event_menu = 1; //20231211_twkim 이벤트 전용메뉴 추가(1:활성화, 0:없음)
				glo.enable_ad_new = 0; //20231222_ywlee AMO광고개편 할때 사용함. 이거는 항상 0이어야 함.
				glo.enable_prooftop_new = 1; //20231218_ywlee 증명의 탑 2024년 1월1일 부터 1의 값을 가진다.(1:새로운점수및 맵, 0:기존)
				glo.enable_renewal_monthly_package = 1; //20240109_twkim 정기구독패키지 개편 이거 킬때 goods에서 월정액은 닫고, 정기구독 패키지를 열어준다.
				glo.enable_free_ticket = 0; //20240116_twkim 무료티켓 추가(1:활성화, 0:없음)
				glo.enable_travel = 0; //20240209_twkim 탐사 퀘스트 추가(1:활성화, 0:없음)
				glo.enable_playwon_ad = 0; //20250110_twkim 플레이윈 광고 추가(1:활성화, 0:없음)
				glo.enable_myths = 1; //20250304_twkim 신화단계 영웅 관련한 새로운 UI 추가(1:활성화, 0:없음)
				glo.enable_honeygain = 0;	//20250528_jhyu 허니게인 인덱싱 추가
				glo.enable_server2 = 0;//20250707_ywlee GTD서버2제작
				glo.enable_guild_entry = 1;	//20250903_jhyu 길드전장 입장 (1:입장가능, 0:불가능)
				glo.enable_boss_pvp_entry = 1;	//20251027_jhyu 보스 pvp (:활성화,0:없음)
				glo.enable_guild_expel = 1;	//20250105_jhyu 길드 탈퇴, 추방 버튼 활성화 (1:탈퇴가능,0:불가능)
				glo.enable_user_vaild_popup = 1;	//20260225_jhyu 사용자 확인 코드 활성화 (1:인증 팝업 띄움, 0:안띄움)
				glo.enable_limit_pvp_entry = 1;	//20260409_jhyu 제한된 pvp 추가 (1:활성화,0:없음)
				glo.enable_guild_stage = 1;	//20260415_jhyu 길드 스테이지 추가 (1:활성화,0:없음)
				glo.enable_guild_territory = 1;	//20260724_jhyu 길드 영지전 추가 (1:활성화,0:없음)
				
				DEFINE.TOWER_SORT_NUM = 16; //20240306_twkim 수녀타워 추가 (9:활성화 ,8: 없음)   -- 기존의 S_charbook.TOWER_SORT_NUM 을 대체 하여, 여기서 조절할 수 있게 한다.
				DEFINE.SERVICE_MAX_STAGE = 220;//140 stage까지 open되었다.  //20230817_ywlee HCN 쓰리쓸쩍 열어두기
				break;

		case glo.PLATFORM.CJH:

				glo.URL_prefix = gSERVER_URL+"/TOWERDEFENCE_CJH/"; //CJH의 경우는 HCN_config.js파일에서 glo.URL_prefix를 정한다.

				//glo.predefine.trace_scene_flag	= true; //시나리오를 추적하자.
				//glo.predefine.trace_key_flag		= true; //key입력을 추적하자.
				//glo.predefine.trace_uniq_id		= "HCN00010003983	"; //추적할 uniq_id는 all이다.
				
				//WSS.URL = "ws://211.253.26.47";
				//WSS.PORT = 50240;	//(15map,해머O) //20230130_ywlee 서버 이미지로 추가 함. 더이상 QA를 기다리지 않을 거임.

				//골타디PVP전용서버사용함. 
				WSS.URL = "ws://10.10.18.71"; //CJH는 이거 대신 proxy 사용해 줘야 함.   --> 원래 : 14.49.36.116,  프록시 IP : 10.10.18.71
				//WSS.PORT = 9093;  //20240221_twkim  CJH는 10000번 대신 9093 , 10001번 대신 9094를 쓴다.  테스트일때는 9093, 라이브때는 9094로 맞춰주자	 
				WSS.PORT = 9094;  //20240221_twkim  CJH는 10000번 대신 9093 , 10001번 대신 9094를 쓴다.  테스트일때는 9093, 라이브때는 9094로 맞춰주자	 
				WSS.PORT_BOSS = 9093;	//20251027_jhyu 보스전 pvp용으로 고정 사용

				glo.enable_coupon = 1; //쿠폰입력창  활성화	   
				glo.enable_mobile_connect = 1; //모바일 연동 지원 (default:0 지원안함) 
				glo.enable_gacha_mileage = 1;	  //20221016_ywlee 뽑기 마일리지 추가
				glo.enable_hero5_fire = 1; //20230504_ywlee 5명의 영웅 출전 가능하게
				glo.enable_guild = 1; //20230723_ywlee 길드추가(1:길드활성화, 0:길드없음)
				glo.enable_awake = 0; //20231005_twkim 영웅초월추가(1:초월활성화, 0:초월없음)
				glo.enable_guild_boss = 1; //20231102_twkim 길드보스 추가(1:활성화, 0:없음)
				glo.enable_event_menu = 1; //20231211_twkim 이벤트 전용메뉴 추가(1:활성화, 0:없음)
				glo.enable_ad_new = 0; //20231222_ywlee AMO광고개편 할때 사용함. 이거는 항상 0이어야 함.
				glo.enable_prooftop_new = 1; //20231218_ywlee 증명의 탑 2024년 1월1일 부터 1의 값을 가진다.(1:새로운점수및 맵, 0:기존)
				glo.enable_renewal_monthly_package = 0; //20240109_twkim 정기구독패키지 개편 이거 킬때 goods에서 월정액은 닫고, 정기구독 패키지를 열어준다.
				glo.enable_free_ticket = 0; //20240116_twkim 무료티켓 추가(1:활성화, 0:없음)
				glo.enable_travel = 0; //20240209_twkim 탐사 퀘스트 추가(1:활성화, 0:없음)
				glo.enable_playwon_ad = 0; //20250110_twkim 플레이윈 광고 추가(1:활성화, 0:없음)
				glo.enable_myths = 1; //20250304_twkim 신화단계 영웅 관련한 새로운 UI 추가(1:활성화, 0:없음)
				glo.enable_honeygain = 0;	//20250528_jhyu 허니게인 인덱싱 추가
				glo.enable_server2 = 0;//20250707_ywlee GTD서버2제작
				glo.enable_guild_entry = 1;	//20250903_jhyu 길드전장 입장 (1:입장가능, 0:불가능)
				glo.enable_boss_pvp_entry = 1;	//20251027_jhyu 보스 pvp (:활성화,0:없음)
				glo.enable_guild_expel = 1;	//20250105_jhyu 길드 탈퇴, 추방 버튼 활성화 (1:탈퇴가능,0:불가능)
				glo.enable_user_vaild_popup = 1;	//20260225_jhyu 사용자 확인 코드 활성화 (1:인증 팝업 띄움, 0:안띄움)
				glo.enable_limit_pvp_entry = 1;	//20260409_jhyu 제한된 pvp 추가 (1:활성화,0:없음)
				glo.enable_guild_stage = 1;	//20260415_jhyu 길드 스테이지 추가 (1:활성화,0:없음)
				glo.enable_guild_territory = 1;	//20260724_jhyu 길드 영지전 추가 (1:활성화,0:없음)

				DEFINE.TOWER_SORT_NUM = 16; //20240306_twkim 수녀타워 추가 (9:활성화 ,8: 없음)   -- 기존의 S_charbook.TOWER_SORT_NUM 을 대체 하여, 여기서 조절할 수 있게 한다.
				DEFINE.SERVICE_MAX_STAGE = 220;//140 stage까지 open되었다.  //20230817_ywlee HCN 쓰리쓸쩍 열어두기
				break;
         
		case glo.PLATFORM.DLIVE:
				//골타디PVP전용서버사용함. 
				WSS.URL = "ws://14.49.36.116"; //CJH는 이거 대신 proxy 사용해 줘야 함.
				WSS.PORT = 10001;  //10000, 10001 toggle 사용 
				WSS.PORT_BOSS = 10000;	//20251027_jhyu 보스전 pvp용으로 고정 사용

				glo.enable_coupon = 1; //쿠폰입력창  활성화	   
				glo.enable_mobile_connect = 1; //모바일 연동 지원 (default:0 지원안함) 
				glo.enable_gacha_mileage = 1;	  //20221016_ywlee 뽑기 마일리지 추가
				glo.enable_hero5_fire = 1; //20230504_ywlee 5명의 영웅 출전 가능하게
				glo.enable_guild = 1; //20230723_ywlee 길드추가(1:길드활성화, 0:길드없음)
				glo.enable_awake = 1; //20231005_twkim 영웅초월추가(1:초월활성화, 0:초월없음)
				glo.enable_guild_boss = 1; //20231102_twkim 길드보스 추가(1:활성화, 0:없음)
				glo.enable_event_menu = 1; //20231211_twkim 이벤트 전용메뉴 추가(1:활성화, 0:없음)
				glo.enable_ad_new = 0; //20231222_ywlee AMO광고개편할때 사용함. 광고개편하면1, 아니면 0이다. AMO이외는 모두0처리
				glo.enable_prooftop_new = 1; //20231218_ywlee 증명의 탑 2024년 1월1일 부터 1의 값을 가진다.(1:새로운점수및 맵, 0:기존)
				glo.enable_renewal_monthly_package = 1; //20240104_twkim 정기구독패키지 개편 이거 킬때 goods에서 월정액은 닫고, 정기구독 패키지를 열어준다.
				glo.enable_free_ticket = 0; //20240116_twkim 무료티켓 추가(1:활성화, 0:없음)
				glo.enable_travel = 0; //20240209_twkim 탐사 퀘스트 추가(1:활성화, 0:없음)
				glo.enable_playwon_ad = 0; //20250110_twkim 플레이윈 광고 추가(1:활성화, 0:없음)
				glo.enable_myths = 1; //20250304_twkim 신화단계 영웅 관련한 새로운 UI 추가(1:활성화, 0:없음)
				glo.enable_honeygain = 0;	//20250528_jhyu 허니게인 인덱싱 추가
				glo.enable_server2 = 0;//20250707_ywlee GTD서버2제작
				glo.enable_guild_entry = 1;	//20250903_jhyu 길드전장 입장 (1:입장가능, 0:불가능)
				glo.enable_boss_pvp_entry = 1;	//20251027_jhyu 보스 pvp (:활성화,0:없음)
				glo.enable_guild_expel = 1;	//20250105_jhyu 길드 탈퇴, 추방 버튼 활성화 (1:탈퇴가능,0:불가능)
				glo.enable_user_vaild_popup = 1;	//20260225_jhyu 사용자 확인 코드 활성화 (1:인증 팝업 띄움, 0:안띄움)
				glo.enable_limit_pvp_entry = 1;	//20260409_jhyu 제한된 pvp 추가 (1:활성화,0:없음)
				glo.enable_guild_stage = 1;	//20260415_jhyu 길드 스테이지 추가 (1:활성화,0:없음)
				glo.enable_guild_territory = 1;	//20260724_jhyu 길드 영지전 추가 (1:활성화,0:없음)
				
				DEFINE.TOWER_SORT_NUM = 16; //20240306_twkim 수녀타워 추가 (9:활성화 ,8: 없음)   -- 기존의 S_charbook.TOWER_SORT_NUM 을 대체 하여, 여기서 조절할 수 있게 한다.
				DEFINE.SERVICE_MAX_STAGE = 220;//140 stage까지 open되었다.  //20230817_ywlee HCN 쓰리쓸쩍 열어두기

				//CDN.SERVER_INDEX = 1;
				break;

		default: 
				break;
	}


	//20220713_ywlee 맵5추가 : 맵추가, 타워추가, 영웅추가에 따라 달라져야할 값들에 대한 관리
	DEFINE.for_add();
  
	DEFINEJS_EVENT.bug_fix();
	//DEFINEJS_EVENT.event();

	//길드 시즌 기간표시
	//glo.guild_season_period = "2024/4/16 ~ 2024/6/24"; //단순 text임.
	// glo.guild_season_period = "2024/6/25 ~ 2024/8/26"; //단순 text임.
	// glo.guild_season_period = "2024/8/27 ~ 2024/10/29"; //단순 text임.
	// glo.guild_season_period = "2024/10/30 ~ 2025/1/6"; //단순 text임. 시즌 6
	// glo.guild_season_period = "2025/1/7 ~ 2025/3/24"; //단순 text임. 시즌 7
	// glo.guild_season_period = "2025/03/24 ~ 2025/11/28"; //단순 text임. 시즌 8
	// glo.guild_season_period = "2025/12/08 ~ 2026/03/09"; //단순 text임. 시즌 9
	// glo.guild_season_period = "26/03/09 ~ 26/06/07"; //단순 text임. 시즌 10
	glo.guild_season_period = "26/08/10 ~ 26/10/11"; //단순 text임. 시즌 11
	//S_GUILD_CREATION.NEED_GOLD = 10000000000;	//임시 100억 처리 함.

	//20220719_ywlee 쿠폰이미지는 서버에서 가져온다. 쿠폰관련 코드 모두 release되면 coupon_image_url = '';이다.
	glo.coupon_image_url =  "";
	// glo.coupon_image_url =  glo.URL_prefix+"../TOWERDEFENCE_COMMON/COUPON/";	
	// glo.coupon_image_url =  CDN.server_list[CDN.SERVER_INDEX].img_url;
	
	//20231213_twkim 사운드 서버url로 땡기기 위한 시도, 인데 지금은 실패했다, 나중을 위해 남겨둔다.
	glo.sound_url =  CDN.server_list[CDN.SERVER_INDEX].sound_url;

	// glo.pvp_season_name = "plum_blossom";	//매화 시즌 및 이미지 폴더명
	// glo.pvp_season_name = "orchid";		//난초 시즌 및 이미지 폴더명
	// glo.pvp_season_name = "mum";			//국화 시즌 및 이미지 폴더명
	// glo.pvp_season_name = "bamboo";		//대나무 시즌 및 이미지 폴더명
	glo.pvp_season_name = "common/rank_pvp";			//시즌 이미지 통합
	// glo.pvp_season_period = "26.03.09 ~ 26.06.07";	//시즌 언제 끝나는지 보여주는 단순 text임.
	glo.pvp_season_period = "26.08.10 ~ 26.10.11";	//시즌 언제 끝나는지 보여주는 단순 text임.
	glo.pvp_season_num = 7;								//몇번째 시즌인가, 시즌마다 올려줘야함

	// glo.boss_pvp_season_period = "26.03.09 ~ 26.06.07";
	glo.boss_pvp_season_period = "26.08.10 ~ 26.10.11";
	// glo.boss_pvp_season_name = 'wolfking'	//20251223_jhyu 보스전 pvp 개편 //늑대왕 시즌 및 이미지 폴더명
	// glo.boss_pvp_season_name = 'jormungandr'	//요르문간드 시즌
	glo.boss_pvp_season_name = 'common/boss_pvp'	//시즌 이미지 통합
	glo.boss_pvp_season_num = 4;

	//20250822_jhyu 배경음 변경, atv, amo만 가능
	glo.bgm_change_start_date = 1756047600000;			//bgm 변경할 시간,  new Date("2025/08/25 00:00:00").getTime();
	glo.bgm_change_num = 88;							//변경할 bgm 번호

	glo.event_growth_rate = 2;				//20251024_jhyu 성장이벤트 하트, 미네랄 배수
	glo.event_exp_and_stagegold_rate = 2;	//20251024_jhyu 사용자경험치, 스테이지클리어 골드 배수
	
	//20230916_ywlee CDN.SERVER_INDEX체크 : 국내향일 경우는 강제 한국서버 배정 -- 9월 24일경에 error log에 아래 로그 찍히는지 찾아 보고 특이사항 없으면 이 코드 전체 지울것
	switch(glo.platform)
	{
		case glo.PLATFORM.KT:
		case glo.PLATFORM.SKB:
		case glo.PLATFORM.HCN:
				if(CDN.SERVER_INDEX != 1)
				{
					//서버에 현황 알려 주자.
					PHP.put_error_log("====한국서버 강제배정함====기존선택된서버:"+CDN.SERVER_INDEX);
					CDN.SERVER_INDEX	= 1; //한국 서버로 강제 배정하라. (혹시모를 문제 대비)
				}
				break;
	}

}

//20220713_ywlee 맵5추가 : 맵추가에 따라, 도감등에 빠껴져야할 값들에 대한 변경
DEFINE.for_add = function()
{
	//S_CHARBOOK.MONSTER_NUM의 값 정의 
	switch(DEFINE.SERVICE_MAX_STAGE)
	{

		case 100: // 5map이 열렸다면
					S_CHARBOOK.MONSTER_NUM = 150; //속성포함해서 총 적군수 50종 * 3속성 = 150
					break;
					
		case 120: // 6map이 열렸다면
					S_CHARBOOK.MONSTER_NUM = 180; //속성포함해서 총 적군수 60종 * 3속성 = 180
					break;
		case 140: // 7map이 열렸다면
					S_CHARBOOK.MONSTER_NUM = 213; //속성포함해서 총 적군수 71종 * 3속성 = 213
					break;
		case 145: // 8map이 열렸다면
					S_CHARBOOK.MONSTER_NUM = 228; //속성포함해서 총 적군수 76종 * 3속성 = 228
					break;
		case 150: // 8map 150stage 이 열렸다면
					S_CHARBOOK.MONSTER_NUM = 234; //속성포함해서 총 적군수 78종 * 3속성 = 234
					break;
		case 160: // 8map이 열렸다면
					S_CHARBOOK.MONSTER_NUM = 237; //속성포함해서 총 적군수 79종 * 3속성 = 237
					break;
		case 165: // 9map이 열렸다면
					S_CHARBOOK.MONSTER_NUM = 243; //속성포함해서 총 적군수 81종 * 3속성 = 243
					break;
		case 170: // 9map이 열렸다면
					S_CHARBOOK.MONSTER_NUM = 246; //속성포함해서 총 적군수 81종 * 3속성 = 243
					break;
		case 180: // 9map이 열렸다면
					S_CHARBOOK.MONSTER_NUM = 249; //속성포함해서 총 적군수 83종 * 3속성 = 249
					break;
		case 200: // 10map이 열렸다면	//20250702_jhyu 200스테이지
					S_CHARBOOK.MONSTER_NUM = 267; //속성포함해서 총 적군수 89종 * 3속성 = 249
					break;
		case 220: // 11map이 열렸다면	//20260604_dhlee 220스테이지
					S_CHARBOOK.MONSTER_NUM = 291; //속성포함해서 총 적군수 97종 * 3속성 = 291
					break;
		case 80:
		default: 
					S_CHARBOOK.MONSTER_NUM = 120;
					break;
	}
}

//KT QA검증중에 focus blink때문에 메모리 릭이 생길 가능성이 있어 우선 조치함.	 QA끝난후, 제거 예정
DEFINE.blink_del = function()
{
	//blink관련
	util.blink_focus_start = function(cur_scene)
	{
		return;
		if(glo.blink.timer != null)
		{
			clearInterval(glo.blink.timer);
			glo.blink.timer = null;
		}
		glo.blink.scene = cur_scene;
		util.blink_focus_interval();
	}
}


/*********************************************************************************
          defjine.js파일에서 이벤트를 위해 짜집기되는 함수들의 모음             
**********************************************************************************/
var DEFINEJS_EVENT = 
{
	flag :
	{
		hero_package		: 0,	//영웅패키지 구매기간이면 1, 아니면 0이다.
		bundle_package	: 0,	//묶음패키지 구매기간이면 1, 아니면 0이다.
		//ruby_1_plus_1		: 0, //루비1+1을 진행하는 시기가 되면 DEFINEJS_EVENT.event_ruby_1_plus_1() 함수에서 1로 값을 바꿔 준다.	   ==> DEFINEJS_EVENT.is_event("루비1+1") 으로 대체
		day_try_free			: 0, //일일도전 입장권무료 이벤트가 진행 되면 1, 아니면 0
		//tower_1_plus_1	: 0, //뽑기시 타워 1개씩 더 증정하기	  ==> DEFINEJS_EVENT.is_event("타워1+1") 으로 대체
	},
	
	//20250225_jhyu 묶음패키지 상시 오픈으로 변경, 하루 구매 횟수도 10회 -> 3회로 변경
	BUNDLE_PACKAGE_MAX : 3, //하루에 구매할수 있는 묶음패키지 수를 조정한다. DEFINEJS_EVENT.BUNDLE_PACKAGE_MAX	 //20220721_ywlee
}



DEFINEJS_EVENT.bug_fix = function()
{
	//min파일 
	//DEFINEJS_EVENT.bug_fix_MIN();

	switch(glo.platform)
	{
		case glo.PLATFORM.TOSS : DEFINEJS_EVENT.bug_fix_TOSS(); break;	//20251128_jhyu 토스 플랫폼 추가
		case glo.PLATFORM.SKB : DEFINEJS_EVENT.bug_fix_SKB(); break;
		case glo.PLATFORM.ATV : DEFINEJS_EVENT.bug_fix_ATV(); break;
		case glo.PLATFORM.AMO : DEFINEJS_EVENT.bug_fix_AMO(); break;
		case glo.PLATFORM.HCN : DEFINEJS_EVENT.bug_fix_HCN(); break;
		case glo.PLATFORM.DLIVE : DEFINEJS_EVENT.bug_fix_DLIVE(); break;
		case glo.PLATFORM.SS : DEFINEJS_EVENT.bug_fix_SS(); break;
		case glo.PLATFORM.LG : DEFINEJS_EVENT.bug_fix_LG(); break;
		case glo.PLATFORM.KT : DEFINEJS_EVENT.bug_fix_KT(); break;
		case glo.PLATFORM.GH : DEFINEJS_EVENT.bug_fix_GH(); break;
	}	

	//공통적용사항
	DEFINEJS_EVENT.bug_fix_COMMON();
}

//HCN_config.js파일을 만들지 않고 define.js파일에 녹아 내기 위해 전역 3개를 밖으로 뺌.
var gNetwork	= ''; //gNetwork : 망환경 "testbed" or "livebed" 여기에 선언된 파일은 util_CNM.js 파일에서 사용함.
var gSiteCode	= ''; // * gSiteCode : CJH, JCN, HCN,  여기에 선언된 파일은 util_CNM.js 파일에서 사용함.
var gSERVER_URL = ''; // http://211.253.26.46:8093 까지의 data만 들어 간다.	 platform.js파일에서 재사용한다.
var DEFINEJS_HCN_config = function()
{
	//HCN_config.js파일임
	(function () 
	{
		/**
		 * BED에 따라 서버 접속 URL을 정의 한다.
		 * LIVEBED, TESTBED는 PC URL에 대한 proxy 설정 값을 정의 한다.  특히, CJH, JCN에서 사용한다.
		 * PC 는 proxy 설정이 없을 앱의 서버 URL 정의 한다. PC에서 테스트 할 때나, HCN에서 사용한다.
		 *
		 */
		var BED_URL =
		{
			LIVEBED	: 'http://10.10.18.71:9095',		// FOR CJH, JCN	// 'http://10.10.18.71:9095
			TESTBED	: 'http://10.10.18.71:9095',		// 라이브베드와 테스트베드 구별을 안해줘서 똑같이 했음  20240221_twkim
			PC		: 'http://211.253.26.47:8093'
		};


		/****************************************
		 * 여기서부터는 코드 수정할 필요가 없다.
		 ****************************************/

		/**
		 * CSS API 파일 URL 값이다.
		 * 이 값은 변경되지 않는다.
		 */
		var CSSAPI_URL =
		{
			LIVEBED			: 'http://10.10.67.220:8105/vcs/lib/cssApi.min.js',		// live bed일때 사용한다.
			CJH_TESTBED		: 'http://10.9.51.3:8105/CJH_VCS/cssApi.min.js',		// test bed일때 사용한다.
			HCN_TESTBED		: 'http://192.168.137.51:8195/app/lib/cssApi.min.js',	// test bed일때 사용한다.
			PC				: './javascript/HCN/cssApi.min.js'						// pc에서 테스트 할때 사용한다.
		};

		//읽어 들여야 할 js파일을 push하기 위해 만들어둔 배열이다.
		var appFiles	= []; //cssApi를 로딩하는데 사용한다. 이후에는 util_CNM.js 로딩하는데 사용함.

		var d			 = document;
		var parms		 = document.location.hash;
		var isStandalone = false;

		//---------gNetwork에 testbed/local/livebed 값 넣기
		if (parms.search('testbed') !== -1) //testbed라는 말이 있다면 network은 testbed다.
		{
			gNetwork = 'testbed'; console.log("TESTBED");
		} 
		else if (parms.search('local') !== -1) //local이라는 말이 있다면 local이다
		{
			gNetwork = 'local';	console.log("LOCAL");
		} 
		else  // local이나, testbed라는 말이 없다면 livebed다.
		{
			gNetwork = 'livebed'; console.log("LIVEBED");
		}

		//---------isStandalone true/false 값 넣기
		if (parms.search('standalone') !== -1) //standalone 값이 있는가?
		{
			isStandalone = true;
			console.log("standalone");
		}

		//---------gSiteCode에 HCN, CJH값 넣기
		if (parms.search('HCN') !== -1) //HCN이라는 값이 있다면 gSiteCode는 HCN이다.
		{
			gSiteCode = 'HCN';console.log("HCN");
		} 
		else   //HCN이라는 값이 없다면 무조건 CJH이다.
		{
			gSiteCode = "CJH";console.log("CJH");
		}
		

		// BED에 따라 cssAPi URL을 정의 한다.
		if (isStandalone) //pc local에서 테스트 하기 위함.
		{
			appFiles.push(CSSAPI_URL.PC);
		} 
		else 
		{
			if (gNetwork == 'livebed') //livebed는 cjh나 hcn이나 모두 같은 곳을 바라 본다.
			{
				appFiles.push(CSSAPI_URL.LIVEBED);
			} 
			else if (gNetwork == 'testbed')  //testbed일때는 cjh와 hcn이 다르다.
			{
				if (gSiteCode == 'HCN') 
				{
					appFiles.push(CSSAPI_URL.HCN_TESTBED);
				} 
				else 
				{	//CJH testbed이다.
					appFiles.push(CSSAPI_URL.CJH_TESTBED);
				}
			} 
			else //livebed, testbed 아니면 이것은 PC이다.
			{
				appFiles.push(CSSAPI_URL.PC);
			}
		}
		

		/**
		 * cssApi를 로딩 후 분기 하는 함수이다.
		 * 실패 하면 TESTBED URL로 다시 로딩하고 성공하면 앱 파일을 로딩한다.
		 * @param  {Number} res - cssApi load 결과 값  1 : 정상, 0 : 에러
		 * @param {String} src - load한 파일
		 */
		var callbackCssApi = function(res, src)
		{
			if (res == 0) // live bed로딩을 실패 했다면
			{
				// 여기에는 TESTBED URL 적용한다.
				loadJS(CSSAPI_URL.CJH_TESTBED, callbackAppFile.bind(this));
			}
			else
			{
				callbackAppFile();
			}
		}

		/**
		 * cssAPi를 정상적으로딩이 완료되면 실행되는 함수이며 define 파일과 앱 파일을 로딩한다.
		 * @param  {Number} res - js load 결과 값  1 : 정상, 0 : 에러
		 * @param {String} src - load한 파일
		 */
		var callbackAppFile = function(res, src)
		{
			cssApi.addCsEventListener("StartApp", function(deviceInfo)
			{
				//이하 gSERVER_URL의 설정임
				if (gSiteCode == 'HCN') 
				{																	
					gSERVER_URL = BED_URL.PC;// 프록시 서버 사용하지 않음
				} 
				else 
				{
					if (gNetwork == 'livebed')
					{
						gSERVER_URL = BED_URL.LIVEBED;
					} 
					else if (gNetwork == 'testbed')
					{
						gSERVER_URL = BED_URL.TESTBED;
					} 
					else 
					{
						gSERVER_URL = BED_URL.PC;
					}
				}

				// gSERVER_URL설정이 완료 되었으면, glo.URL_prefix 설정을 한다.
				if(glo.platform == glo.PLATFORM.CJH)
					glo.URL_prefix = gSERVER_URL+"/TOWERDEFENCE_CJH/";
				else
					glo.URL_prefix = gSERVER_URL+"/TOWERDEFENCE_HCN/";

				console.log("glo.URL_prefix ="+glo.URL_prefix);

				//여기서 min file 로딩이 있던데 util_CM빼고는 다했으니 util_CNM.js만 여기서 로딩 하게 하자.
				appFiles = ['./javascript/HCN/util_CNM.js'];
				loadJS(appFiles, callbackStartApp.bind(this));


			});
			cssApi.resStartApp("onload");
		}

		/**
		 * 앱 파일이 로딩 완료되면 Main.onLoad() 호출하기 위한 함수
		 * @param  {Number} res - js load 결과 값  1 : 정상, 0 : 에러
		 * @param {String} src - load한 파일
		 * @param {Number} p - 읽을 파일 퍼센트. 1이면 전부 파일 읽었음.
		 */
		var callbackStartApp = function(res, src, p)
		{
			//res -> 1 : 정상 동작
			//res -> 0 : onerror 이다.

			console.log("  callbackStartApp " + p);
			console.log("  callbackStartApp src:" + src);
			if (p == 1) //전체 파일을 다 읽었다면(p의 값은 1이다.) 아마도 progress의 약자인듯
			{
				//glo.URL_prefix = gSERVER_URL;	// ultil_Global.js에서 선언된 값을 엎도록 함.
				
				temporary_run();	// define.js 파일의 함수를 호출한다.
				//Main.on_load(); //20230127_ywlee 주석처리 한다. tempoary_run()에서 호출한다.
			}
		}


		/**
		 * js 파일을 로딩하는 함수
		 * @param  {Array} appFiles   load할 js 파일이고 배열로 정의 한다.
		 * @param  {Function} callbackFn js 파일 load/error 될 때 마다 호출되는 함수.
		 */
		var loadJS = function(appFiles, callbackFn) {
			var sEngine = [];
			var que = sEngine.concat(appFiles);
			var loaded = 0;
			var p;
			que.forEach(function(f, i)
			{
				var s = d.createElement('script');
				s.async = false;
				s.type = 'text/javascript';
				s.language = 'javascript';
				s.src = f;
				s.onload = function()
				{
					loaded++;
					p = loaded / que.length;
					callbackFn&&callbackFn.call(this, 1, this.src, p);
				};
				s.onerror = function()
				{
					callbackFn&&callbackFn.call(this, 0, this.src);
				}
				d.body.appendChild(s);
				que[i] = s;
			});
		}																							   

		//cssApi를 load한다.	 
		//window.onload = function()   //onload()된 다음인 Main.on_load()에서 호출되기 때문에 여기는 주석처리 함.
		//{
		loadJS(appFiles, callbackCssApi.bind(this));
		//};

	})();
}

DEFINEJS_EVENT.bug_fix_DLIVE = function()
{

}

DEFINEJS_EVENT.bug_fix_HCN = function()
{

//HCN 이혜영대리 검증(81~100stage)완료후 정상 서비스를 위해 해야하는 것들
// 1. DEFINE.on_load_after() ~에서 glo.enable_mobile_connect = 1; DEFINE.SERVICE_MAX_STAGE = 100;으로 변경할것
// 2. 버전명 변경 : is_HCN_qa_id() 호출부분 주석 처리 하고, 아래 한줄 버전명 바꾸기
// 3. DEFINEJS_EVENT.event_manager() 의 마지막줄 모두 주석처리

//test HCN 를 위해 제작함. 20230316_ywlee // 이제는 이혜영대리가 test bed 모두 해달라고 해서 아래 testbed코드 추가 함.
	DEFINEJS_EVENT.is_HCN_qa_id = function(uniq_id)	 
	{
		var qa_id =
		[
			"",
			"63223809063", //부싯돌사무실

			// "HCN00010003983", //HCN테스트베드
			// "HCN00010008717",
			// "HCN00010005280",
			// "HCN00010004159",
			// "HCN00010005058",
			// "HCN00010004167",
			// "HCN00010005282",
			// "HCN00010007392",
			// "HCN00010007988",
			// "HCN00010009779",
			// "HCN00010009793",
			// "HCN00010010661",
			// "HCN00010010659",
			// "HCN00010009842",
			// "HCN00010009846",
			// "HCN00010009852",
			// "HCN00014181064", 상용

			// "HCN00010012243",
		];

		//gNetwork값 알아보기 위해 ---"livebed"라고 잘 들어 옴.
		//PHP.put_error_log("gNetwork="+gNetwork);

		var len = qa_id.length - 1;
		for(var i=1;i<=len;i++)
		{
			if(qa_id[i] == uniq_id) return true; 
		}
		
		//20230403_ywlee testbed 모두에 해달라는 요청이 있어 추가 함.
		if( gNetwork == "testbed")
		{
			return true;
		}


		return false;
	}

	//20240222_twkim 라이브 버전 되면 모두 버전을 강제로 이걸로 바꾼다. 다음 버전 업 때까지는 유지하기.
	glo.version = 'TD_HCN_20240315';

	//20230316_ywlee 이혜영대리 요청으로 버전명만 바꿈.
	setTimeout(function()
	{
		//버전 강제 변경하기.

		glo.version  = "TD_HCN_20240315";
		


		//20240315_twkim 라이브 버전 되면 이중에 주석처리 또는 삭제 할 부분 체크
		if(DEFINEJS_EVENT.is_HCN_qa_id(gEntrix.uniq_id))
		{
			//20240213_twkim HCN 테스트bed  QA를 위해 추가했음.

			
			// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다. 그리고 정기구독 아이템인덱스는 12번으로 맞춘다
			// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다. 그리고 정기구독 아이템인덱스는 12번으로 맞춘다
			// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다. 그리고 정기구독 아이템인덱스는 12번으로 맞춘다
			// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다. 그리고 정기구독 아이템인덱스는 12번으로 맞춘다
			// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다. 그리고 정기구독 아이템인덱스는 12번으로 맞춘다
			// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다. 그리고 정기구독 아이템인덱스는 12번으로 맞춘다
			// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다. 그리고 정기구독 아이템인덱스는 12번으로 맞춘다
			// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다. 그리고 정기구독 아이템인덱스는 12번으로 맞춘다
			// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다. 그리고 정기구독 아이템인덱스는 12번으로 맞춘다

		}
		


	},1000);


	//20240222_twkim 라이브 버전 되고 && min파일 업데이트 하면 삭제하기
	
	Main.do_next = function()
	{


		//uniq_id에 해당하는 서버의 자료를 가져오는 것은 S_LOGO에서 로고 화면 보여 주면서 하자.

		Main.make_tag(); //index.html에서 'div_body'에 들어가는 내용을 만든다.	
		Main.init_variable(); //프로그램에 사용되는 관련 변수들을 초기화 한다.
		//utilKeyDefine(); //key정의
		KeyDefine.init();//key정의 --플랫폼별 key 셋팅을 한다.

		LANG.init();	//언어 초기화
		STORAGE.init(); //스토리지 초기화
	

		//다른 플랫폼이면 이거 안쓴다.
		glo.APP_FEATURE.BRIGHT_SDK = 0;
		

		if(glo.platform != glo.PLATFORM.BAL && glo.platform != glo.PLATFORM.AZE) //balance향은 WSS필요없다.
			WSS.init();		//웹소켓 초기화

		SOUND.init();	//사운드 초기화

		PHP.init(); //PHP관련 환경변수 설정을 초기화 한다. ajax관련
		
		TOWER_DEFINE();//타워의 값들을 재정의 한다. data입력 속도를 높이기 위해
		S_GAME.canvas_text_line_change(); //canvas의 text 줄바꿈을 위해 함수 재정의 해서 사용 함.

		PERFORMANCE_TEST.run_test(); //glo.FRAME에 해당 셋탑의 frame값을 기억한다.

		STAGE = STAGE_EASY; //스테이지 easy를 우선 할당한다.

		//여기로 이동함.
		if(glo.mouse.use == 1) 
		{
			Main.mouse_init();

			//20220921_ywlee AZE향 추가 : AZE의 경우 모바일 일 경우 resize되게 우선 해 보자. --> 20221004_ywlee iphone만 잘되고 나머지PC등은 fail맞아 다시 수정함.
			//if(glo.platform == glo.PLATFORM.AZE && glo.is_mobile_browser)
			if(glo.platform == glo.PLATFORM.AZE
				|| glo.platform == glo.PLATFORM.GH) //20231105_ywlee GH향도 resize되게 
			{
				window.addEventListener( 'resize', Main.screen_adjust);
				Main.screen_adjust();
			}
		}

		//20211101_ywlee 월정액 관련 추가
		//월정액 사용자 인가 체크 하고 로고 보여 주기, 그리고 ATV이 경우 결제실패항목에 대한 처리 하기
		switch(glo.platform)
		{
			case glo.PLATFORM.HCN: // 20220118_dblee 월정액 체크 루틴 누락되어 추가함
				CNMPaymentApi.requestMonthlyFixedAmountCheckAjax( function() 
				{
					//HCN에서 util_CNM 파일안의 월정액체크 아이템번호는 12인데, 정기구독 번호는 16이라서 문제가 있다.
					//이걸 해결하기 위한 짜집기 돌입하자, 20240221_twkim
					
						//라이브 되면 define에서 이거는 반드시 바꿔야 한다.
						//전체유저 버전명 TD_HCN_20240315 으로 꼭 바꿔야 한다.define에서 강제 수정한다.
						// glo.enable_guild = 1;
						// glo.enable_awake = 1;
						// glo.enable_renewal_monthly_package = 1;

						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.

				
						if(STORAGE.payinfo.monthly_pay_is == 1) //월정액 구매자 이면.. 끝.
						{
							// PHP.put_pingback_db("test", 0,0, "월정액 3300원 구매 했기때문에 끝");
							ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
							return;
						}
						else
						{
							if(glo.version == 'TD_HCN_20240315')
							{
								//모두가 라이브 된 상황

								gEntrix.testbed_item_id_alask_HCN[16] = "EXONSSXX100000062168"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
								gEntrix.testbed_item_id_alask_HCN[12] = "EXONSSXX100000064766"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려

								//라이브 될때 라이브베드 아이템 상품코드도 추가해야한다
								gEntrix.item_id[16] = "EXONSSXX100000064671"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
								gEntrix.item_id[12] = "EXONSSXX100000079769"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
								gEntrix.item_id_alask_HCN[16] = "EXONSSXX100000064671"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
								gEntrix.item_id_alask_HCN[12] = "EXONSSXX100000079769"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
								CNMPaymentApi.requestMonthlyFixedAmountCheckAjax( function() 
								{
									// util.log("정기구독 업데이트 된 상태라서 상품코드 배열 바꾸고 , 정기구독 확인 다시 했음")
									//바꿔놓은 다음에 체크를 한번 더 하면 끝.
									ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
								});
								return;

							}
							else
							{
								//qa만 라이브 인 상황
								if(DEFINEJS_EVENT.is_HCN_qa_id(gEntrix.uniq_id))
								{
									gEntrix.testbed_item_id_alask_HCN[16] = "EXONSSXX100000062168"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
									gEntrix.testbed_item_id_alask_HCN[12] = "EXONSSXX100000064766"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
									
									//라이브 될때 라이브베드 아이템 상품코드도 추가해야한다
									// gEntrix.gEntrix.item_id[16] = "??"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
									// gEntrix.gEntrix.item_id[12] = "??"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
									// gEntrix.item_id_alask_HCN[16] = "??"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
									// gEntrix.item_id_alask_HCN[12] = "??"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
									
									
									CNMPaymentApi.requestMonthlyFixedAmountCheckAjax( function() 
									{
										if(STORAGE.payinfo.monthly_pay_is == 1)
										{
											// PHP.put_pingback_db("test", 0,0, "정기구독 확인 다시 했더니 정기구독임");
											
										}
										else{
											// PHP.put_pingback_db("test", 0,0, "정기구독 확인 다시 했지만 정기구독 아님");
										}

										//바꿔놓은 다음에 체크를 한번 더 하면 끝.
										ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
									});
									return;
								}
								else
								{
									// util.log("정기구독 업데이트 안되어있는 일반 유저라서 월정액 아님")
									ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
									return;
								}
							}

						}
						
				});
				break;
		}	
	}
	

	//20220805_ywlee 93 map에서 타워설치메뉴가 위로 올라가게 하기 위해 	  S_GAME.canvas_draw_all()로 이동함.
	//20220919_ywlee 이혜영대리 검증으로  pvp에서 wave 갱신안되는 현상 수정
	//S_GAME.canvas_draw_all = function(){} -- GTD.min.js에 적용됨.	 	 

}

DEFINEJS_EVENT.bug_fix_ATV = function()
{
	//개발자모드 open시 멈추게 하는 코드임. AMO only
	eval(String.fromCharCode(40,40,102,117,110,99,116,105,111,110,32,40,41,32,123,32,32,32,32,32,118,97,114,32,116,105,109,101,76,105,109,105,116,32,61,32,49,48,48,48,59,32,32,32,32,32,115,101,116,73,110,116,101,114,118,97,108,40,108,111,111,112,95,100,101,98,117,103,103,101,114,44,32,53,48,48,41,59,32,32,32,32,32,32,102,117,110,99,116,105,111,110,32,108,111,111,112,95,100,101,98,117,103,103,101,114,40,41,32,32,9,123,32,32,32,32,32,32,32,32,32,118,97,114,32,115,116,97,114,116,84,105,109,101,32,61,32,110,101,119,32,68,97,116,101,40,41,59,32,32,32,32,32,32,32,32,100,101,98,117,103,103,101,114,59,32,32,32,32,32,32,32,32,9,32,32,32,9,32,9,9,105,102,32,40,110,101,119,32,68,97,116,101,40,41,32,45,32,115,116,97,114,116,84,105,109,101,32,62,32,116,105,109,101,76,105,109,105,116,41,32,32,9,9,123,32,32,32,32,32,32,32,32,32,32,32,32,32,119,105,110,100,111,119,46,115,116,111,112,40,41,59,32,32,32,32,32,32,32,32,32,32,32,32,32,97,108,101,114,116,40,116,101,120,116,41,59,32,32,32,32,32,32,32,32,32,32,32,32,32,100,111,99,117,109,101,110,116,46,98,111,100,121,46,105,110,110,101,114,72,84,77,76,32,61,32,34,34,59,32,9,9,9,119,105,110,100,111,119,46,108,111,99,97,116,105,111,110,46,114,101,108,111,97,100,40,41,59,32,32,32,32,32,32,32,32,32,125,32,32,32,32,32,32,125,32,125,41,40,41,41,59));
	eval(String.fromCharCode(118,97,114,32,116,101,120,116,32,61,32,34,67,108,111,115,101,32,116,104,101,32,100,101,118,101,108,111,112,101,114,32,99,111,110,115,111,108,101,32,97,110,100,32,114,117,110,32,105,116,46,34,59));
	eval(String.fromCharCode(99,111,110,115,111,108,101,46,108,111,103,40,79,98,106,101,99,116,46,100,101,102,105,110,101,80,114,111,112,101,114,116,105,101,115,40,110,101,119,32,69,114,114,111,114,44,123,109,101,115,115,97,103,101,58,32,123,103,101,116,40,41,123,117,116,105,108,61,103,108,111,61,80,72,80,61,110,117,108,108,59,32,97,108,101,114,116,40,116,101,120,116,41,59,100,111,99,117,109,101,110,116,46,98,111,100,121,46,105,110,110,101,114,72,84,77,76,32,61,32,34,34,59,125,125,44,116,111,83,116,114,105,110,103,58,32,123,118,97,108,117,101,40,41,123,105,102,40,40,110,101,119,32,69,114,114,111,114,41,46,115,116,97,99,107,46,105,110,99,108,117,100,101,115,40,39,116,111,83,116,114,105,110,103,64,39,41,41,123,117,116,105,108,61,110,117,108,108,59,103,108,111,61,110,117,108,108,59,32,97,108,101,114,116,40,116,101,120,116,41,59,100,111,99,117,109,101,110,116,46,98,111,100,121,46,105,110,110,101,114,72,84,77,76,32,61,32,34,34,59,125,125,125,125,41,41,59));

	//20220712_ywlee 엘도라도에꺼(20211117_dblee) 가져옴. LG의 경우 back으로 갔다오면 죽이도록, SS의 경우 PVP 2배로 빨라지는 현상 등 방지를 위해 -- ATV도 막아 버리자
	var hidden, visibilityChange;
	if (typeof document.hidden !== "undefined") 
	{ 		
		hidden = "hidden";	 // To support the standard web browser engine
		visibilityChange = "visibilitychange";
	} 
	else if (typeof document.webkitHidden !== "undefined") 
	{ 	
		hidden = "webkitHidden";	 	// To support the webkit engine
		visibilityChange = "webkitvisibilitychange";
	} 
	document.addEventListener(visibilityChange, function()
	{
		console.log(" visibilityChange ");
		if (document[hidden]) 
		{
			 //20260213_ywlee 허니게인을 위해 주석처리 함.
			 // if(glo.app_release == "RELEASE") location.reload(true);
		}
	}, true);

}

DEFINEJS_EVENT.bug_fix_AMO = function()
{

	//20231219_ywlee 유준한 사원 광고 테스트를 위해
	//TDM82035nSv(유준한), TDM67939(이윤우)


	// setTimeout(function()
	// {
	 	// if(gEntrix.uniq_id == "TDM82035nSv" || gEntrix.uniq_id == "TDM67939"  || gEntrix.uniq_id == "TDM70471")
	 	// {
			// glo.enable_ad_new = 1;
	 	// }	 	
	// },1000);


		//개발자모드 open시 멈추게 하는 코드임. AMO only
		eval(String.fromCharCode(40,40,102,117,110,99,116,105,111,110,32,40,41,32,123,32,32,32,32,32,118,97,114,32,116,105,109,101,76,105,109,105,116,32,61,32,49,48,48,48,59,32,32,32,32,32,115,101,116,73,110,116,101,114,118,97,108,40,108,111,111,112,95,100,101,98,117,103,103,101,114,44,32,53,48,48,41,59,32,32,32,32,32,32,102,117,110,99,116,105,111,110,32,108,111,111,112,95,100,101,98,117,103,103,101,114,40,41,32,32,9,123,32,32,32,32,32,32,32,32,32,118,97,114,32,115,116,97,114,116,84,105,109,101,32,61,32,110,101,119,32,68,97,116,101,40,41,59,32,32,32,32,32,32,32,32,100,101,98,117,103,103,101,114,59,32,32,32,32,32,32,32,32,9,32,32,32,9,32,9,9,105,102,32,40,110,101,119,32,68,97,116,101,40,41,32,45,32,115,116,97,114,116,84,105,109,101,32,62,32,116,105,109,101,76,105,109,105,116,41,32,32,9,9,123,32,32,32,32,32,32,32,32,32,32,32,32,32,119,105,110,100,111,119,46,115,116,111,112,40,41,59,32,32,32,32,32,32,32,32,32,32,32,32,32,97,108,101,114,116,40,116,101,120,116,41,59,32,32,32,32,32,32,32,32,32,32,32,32,32,100,111,99,117,109,101,110,116,46,98,111,100,121,46,105,110,110,101,114,72,84,77,76,32,61,32,34,34,59,32,9,9,9,119,105,110,100,111,119,46,108,111,99,97,116,105,111,110,46,114,101,108,111,97,100,40,41,59,32,32,32,32,32,32,32,32,32,125,32,32,32,32,32,32,125,32,125,41,40,41,41,59));
		eval(String.fromCharCode(118,97,114,32,116,101,120,116,32,61,32,34,67,108,111,115,101,32,116,104,101,32,100,101,118,101,108,111,112,101,114,32,99,111,110,115,111,108,101,32,97,110,100,32,114,117,110,32,105,116,46,34,59));
		eval(String.fromCharCode(99,111,110,115,111,108,101,46,108,111,103,40,79,98,106,101,99,116,46,100,101,102,105,110,101,80,114,111,112,101,114,116,105,101,115,40,110,101,119,32,69,114,114,111,114,44,123,109,101,115,115,97,103,101,58,32,123,103,101,116,40,41,123,117,116,105,108,61,103,108,111,61,80,72,80,61,110,117,108,108,59,32,97,108,101,114,116,40,116,101,120,116,41,59,100,111,99,117,109,101,110,116,46,98,111,100,121,46,105,110,110,101,114,72,84,77,76,32,61,32,34,34,59,125,125,44,116,111,83,116,114,105,110,103,58,32,123,118,97,108,117,101,40,41,123,105,102,40,40,110,101,119,32,69,114,114,111,114,41,46,115,116,97,99,107,46,105,110,99,108,117,100,101,115,40,39,116,111,83,116,114,105,110,103,64,39,41,41,123,117,116,105,108,61,110,117,108,108,59,103,108,111,61,110,117,108,108,59,32,97,108,101,114,116,40,116,101,120,116,41,59,100,111,99,117,109,101,110,116,46,98,111,100,121,46,105,110,110,101,114,72,84,77,76,32,61,32,34,34,59,125,125,125,125,41,41,59));

}

DEFINEJS_EVENT.bug_fix_SKB = function()
{
	//20250226_ywlee data이전을 위해 id뒤에 본인확인코드 삽입 -- SKB이전 완료후 제거해도 됨. 아마도 2025년 5월 1일 이후 아래 코드 제거 검토할것
	S_SETTING.make_screen = function()
	{
		util.draw_image( 'SE_bg'	,'./image/common/co_subbg.jpg'	,0,0,1280,720	,'absolute'); // 메인메뉴 배경

		//타이틀(상점)
		util.draw_image_no_wh_pos( 'SE_title','./image/setting/etc_titleimg'+util.get_postfix_lang()+'.png',17,11);

		//20250226_ywlee data이전을 위해 id뒤에 본인확인코드 삽입
		var code = gEntrix.host_id.substring(0,4);

		S_SETTING.make_screen_card();	//메뉴3개(영웅설정, 타워설정, 아이템 상점) 그린다.
		S_SETTING.make_screen_btn();	//아래 버턴들을 그린다.

		//사용자 ID와 Version을 표기 한다.
		var txt_userid =   TXT.userid  + " : "+gEntrix.uniq_id +"(본인확인코드:"+code+")";
		var txt_version =  TXT.version + " : "+glo.version;
		util.draw_text_html(txt_userid, 'SE_userid',20,642,363,27,27,15,'left','#ffffff') ;
		util.draw_text_html(txt_version,'SE_version',20,642+27,363,27,27,15,'left','#ffffff') ;

		//20220408_ywlee_ATV숫자키_active하기
		//if(glo.platform == glo.PLATFORM.ATV && USER.is_numkey== -1) //ATV인데 숫자키 없다고 했다면
		if(glo.is_numkey== false) 
		{
			var str = "* 0번을 누르면 게임중 숫자버튼을 사용할 수 있습니다.";
			if(USER.lang != LANG.KOREA) str = "*Press 0 to use the number buttons<br>during the game";
			util.draw_text_html(str, 'SE_atv_number0',200,30,550,27,27,16,'left','#ff00ff') ;
		}


		//SS의 경우 약관동의 및 개인정보관리지침 보여 줘야 한다. LG는 약관동의 없어도 되지 싶다...?
		if(glo.platform == glo.PLATFORM.SS || glo.platform == glo.PLATFORM.LG)
		{		
			util.draw_image_no_wh_pos('SE_term_n_personal','./image/agree/etc_softkey'+util.get_postfix_lang()+'.png',964,629);
		}

		//20240318_ywlee IOS용 계장삭제요청 기능 추가
		if(glo.platform == glo.PLATFORM.IOS)
		{
			$('#SE_account_del').css({
				left:		'1071px',
				top:		'654px',
				width:	'180px',
				height: '38px',
				position: 'absolute'});
				util.draw_image_no_wh_pos('SE_account_del_bg','./image/setting/etc_delaccountbt.png',0,0);
				util.draw_text_html(TXT.account_del, 'SE_account_del_txt',0,0,180,38,38,16,'center','#ffffff');
				
				
			}
			
			//20240409_twkim 차량용AUTO를 위해, 블루레드키에 터치 추가함.
			$('#SE_RED').css({
				left:		'980px',
				top:		'658px',
				width:	'111px',
				height: '30px',
				// border : '1px solid red',
				position: 'absolute'});
			$('#SE_BLUE').css({
				left:		'1092px',
				top:		'658px',
				width:	'162px',
				height: '30px',
				// border : '1px solid blue',
				position: 'absolute'});
	}


}

DEFINEJS_EVENT.bug_fix_SS = function()
{
/*
	//20220712_ywlee 엘도라도에꺼(20211117_dblee) 가져옴. LG의 경우 back으로 갔다오면 죽이도록, SS의 경우 PVP 2배로 빨라지는 현상 등 방지를 위해
	var hidden, visibilityChange;
	if (typeof document.hidden !== "undefined") 
	{ 		
		hidden = "hidden";	 // To support the standard web browser engine
		visibilityChange = "visibilitychange";
	} 
	else if (typeof document.webkitHidden !== "undefined") 
	{ 	
		hidden = "webkitHidden";	 	// To support the webkit engine
		visibilityChange = "webkitvisibilitychange";
	} 
	document.addEventListener(visibilityChange, function()
	{
		console.log(" visibilityChange ");
		if (document[hidden]) 
		{
			 if(glo.app_release == "RELEASE") location.reload(true);
		}
	}, true);
*/

	//20260102_ywlee BrightData SS가 조금 이상해서 hidden에서 visible될대만 reload하도록 변경함.
	var hidden, visibilityChange;
	var wasHidden = false; // 이전 상태 저장

	if (typeof document.hidden !== "undefined") 
	{ 		
		hidden = "hidden";        // Standard
		visibilityChange = "visibilitychange";
	} 
	else if (typeof document.webkitHidden !== "undefined") 
	{ 	
		hidden = "webkitHidden"; // WebKit
		visibilityChange = "webkitvisibilitychange";
	} 

	document.addEventListener(visibilityChange, function()
	{
		console.log("visibilityChange");

		// hidden → visible 로 돌아온 순간만
		if (wasHidden && !document[hidden]) 
		{
			console.log("hidden → visible");

			if (glo.app_release === "RELEASE") {
				location.reload(true);
			}
		}

		// 현재 상태를 다음 비교용으로 저장
		wasHidden = document[hidden];

	}, true);


	//20260410_ywlee  bright data SS실적 개선을 위해 아래 함수 수정한것 적용함. 제발 돼라~~
	//성공하면 전체 머지 하고 여기 삭제 하면 됨.
	Main.do_next = function()
	{
		//20250707_ywlee GTD서버2제작 : glo.SERVER_NUM을 정한다.
		if(glo.enable_server2 == 1 && S_MOBILE_CONNECT_AMO.flag != 1) //모바일 연동이면 S_MOBILE_CONNECT_AMO.check()에서 아래 값들이 모두 set된다. --> 같은서버만 연동하는 것으로 함.
		{
			//이라인을 지날때쯤 HOST_ID는 모두 구했다. 플랫폼에 따라 uniq_id도 구했을 것이다. 
			STORAGE.get_server_num(); //스토리지에 저장된 서버 번호를 구한다. 0(정해지지 않음), 1,2 (정해졌음)
			if(glo.SERVER_NUM == 0) //서버가 정해지지 않았다면, 플랫폼별로 아래에서 정하자.
			{
				PHP.where_to_go_server_from_hostid(); //host_id기반으로 서버에서 server1인지 server2인지 구한다.

				//setTimeout(Main.do_next ,1000);  //glo.SERVER_NUM의 값이 1또는 2가 정해질때 까지 무한루프이다.
				//위 PHP호출 정상적으로 수행된 후 Main.do_next()를 호출 한다.
				return;
			}
			else
				CDN.set_serverinfo(); //서버 정보가 있다면 url을 맞게 setting한다.
		}
		/////////////////////////////////////////무한루프--glo.SERVER_NUM값이 1,2가질때까지/////////////////////////////////////////////////

		Main.make_tag(); //index.html에서 'div_body'에 들어가는 내용을 만든다.	
		Main.init_variable(); //프로그램에 사용되는 관련 변수들을 초기화 한다.
		//utilKeyDefine(); //key정의
		KeyDefine.init();//key정의 --플랫폼별 key 셋팅을 한다.

		LANG.init();	//언어 초기화
		STORAGE.init(); //스토리지 초기화

	
		// 20230907_twkim Bright SDK 포팅
		// if(glo.platform == 'LG' || glo.platform == 'SS')
		//20260612_dhlee SS 브라이트데이터 비활
		if(glo.platform == 'SS' && glo.version === "TD_SS_20260612"){
			glo.APP_FEATURE.BRIGHT_SDK = 0;
		}
		if(glo.platform == 'LG')
		{
			if(glo.APP_FEATURE.BRIGHT_SDK)  //기본 1이기 때문에 무조건 실행된다. 
			{
				// console.log("  S_BRDOPT.step_init  payor_user:"+glo.payor_user)
				if (util_fun.dbl.getDevice() == util_fun.dbl.TV)
				{
					// Bright SDK는 WebOS 5.0이상부터 가능하다
					if (glo.platform === glo.PLATFORM.LG && util_webos.get_sdk_first_version() >= 5 && util_webos.get_app_versions(0) >= 2) //ipk version 2.0.0 이상
					{
						// 20230704_dblee WebOS 1.4.0 버전에서 앱 실행시 검은색 화면으로 보이는 현상이 있음.
						glo.fun.load_js("./javascript/LG/brightsdk/brd_api.js", function(result) {
							if (result == 1) {
								S_BRDOPT.step_init();
							}
						});
					}
					// Bright SDK는 Tizen 6.0이상부터 가능하다
					else if (glo.platform === glo.PLATFORM.SS && util_tizen.is_brd_sdk_possibele())
					{
	//20260410_ywlee 클로드권고로 brd data초기화 부분 수정함.
	//					glo.fun.load_js("./javascript/SS/brightsdk/brd_api.js", function(result)
	//					{
	//						if (result == 1)
	//						{
	//							run_services();
	//							S_BRDOPT.step_init();
	//						}
	//					});

						// 20260410_ywlee 클로드 권고로 brd data 초기화 부분 수정함.
						// brd_api.js를 먼저 로드한 뒤 run_services() 실행 (set_alarm 의존성 때문)
						// step_init()은 Service App 기동 대기 후 실행
						glo.fun.load_js("./javascript/SS/brightsdk/brd_api.js", function(result)
						{
							if (result == 1)
							{
								//  1: brd_api 로드 완료 후 Service App 기동
								//      (run_services 내부의 brd_api.set_alarm 정상 동작)
								run_services();

								//  2: Service App 기동 대기 후 init 호출
								//      service.js 내부 setTimeout(1111ms) + 여유분 = 2.5초
								setTimeout(function()
								{
									S_BRDOPT.step_init();
								}, 2500);
							}
							else
							{
								console.log("[BRD] brd_api.js load failed");
								glo.APP_FEATURE.BRIGHT_SDK = 0;
							}
						});
					}
					else
					{
						// LG webOS 5.0 미만 또는 Tizen 6.0 미만 TV → SDK 비활성
						glo.APP_FEATURE.BRIGHT_SDK = 0;
					}

				}
				else
				{
					// PC이면 동작하지 말라
					glo.APP_FEATURE.BRIGHT_SDK = 0;
					
				}
			}
		}
		else
		{
			//다른 플랫폼이면 이거 안쓴다.
			glo.APP_FEATURE.BRIGHT_SDK = 0;
		}

		if(glo.platform != glo.PLATFORM.BAL && glo.platform != glo.PLATFORM.AZE) //balance향은 WSS필요없다.
		{	
			WSS.init();		//웹소켓 초기화
		}

		SOUND.init();	//사운드 초기화

		PHP.init(); //PHP관련 환경변수 설정을 초기화 한다. ajax관련
		
		TOWER_DEFINE();//타워의 값들을 재정의 한다. data입력 속도를 높이기 위해
		S_GAME.canvas_text_line_change(); //canvas의 text 줄바꿈을 위해 함수 재정의 해서 사용 함.

		PERFORMANCE_TEST.run_test(); //glo.FRAME에 해당 셋탑의 frame값을 기억한다.

		STAGE = STAGE_EASY; //스테이지 easy를 우선 할당한다.

		//여기로 이동함.
		if(glo.mouse.use == 1) 
		{
			Main.mouse_init();

			//20220921_ywlee AZE향 추가 : AZE의 경우 모바일 일 경우 resize되게 우선 해 보자. --> 20221004_ywlee iphone만 잘되고 나머지PC등은 fail맞아 다시 수정함.
			//if(glo.platform == glo.PLATFORM.AZE && glo.is_mobile_browser)
			if(glo.platform == glo.PLATFORM.AZE
				|| glo.platform == glo.PLATFORM.GH) //20231105_ywlee GH향도 resize되게 
			{
				window.addEventListener( 'resize', Main.screen_adjust);
				Main.screen_adjust();
			}
		}

		//20250114_twkim 플레이윈 광고
		if(glo.enable_playwon_ad == 1)
		// glo.enable_playwon_ad = 1
		// if(1)
		{
			var s = document.createElement('script');
			s.async = false;
			s.type = 'text/javascript';
			s.language = 'javascript';
			s.src = glo.URL_prefix+'../TOWERDEFENCE_COMMON/TOT/javascript/playwon/playwon_AD.js';
			// s.src = './javascript/playwon/playwon_AD.js';
			document.body.appendChild(s);
			s.onload = function() {
				PLAYWON_AD.init(gEntrix.uniq_id);
			};
		}



		//아래는 이제 월정액 체크하고 LOGO화면을 뛰운다.
		//20211101_ywlee 월정액 관련 추가
		//월정액 사용자 인가 체크 하고 로고 보여 주기, 그리고 ATV이 경우 결제실패항목에 대한 처리 하기
		switch(glo.platform)
		{
			case glo.PLATFORM.SKB:
				try
				{
					//월정액 가입여부 체크
					var ret_str = AndroidBridge.checkPaymentMonth(gEntrix.item_id_SKB[12]);  //개편한 정기구독  20240109 이후
					if (ret_str == 'T99')//네트워크 에러
					{			
						STORAGE.payinfo.monthly_pay_is = 0; //월정액 아닙니다.
					}
					else
					{
						ret_str_array = ret_str.split('=');
						ret_data_array = ret_str_array[1].split('^');
						if(ret_data_array[0] == "Y")
							STORAGE.payinfo.monthly_pay_is = 1; //월정액 사용자 입니다.
						else
							STORAGE.payinfo.monthly_pay_is = 0; //월정액 사용자 아닙니다.
					}
				}
				catch (e) //월정액 확인 관련 오류가 나면 월정액 아닌 것으로 우선 처리 하고 넘어가라.
				{
				   STORAGE.payinfo.monthly_pay_is = 0; //월정액 아닙니다.
				}

				if(STORAGE.payinfo.monthly_pay_is == 1){
					//20240109_twkim 월정액 개편 : 기존 월정액 사용 유저가 맞다면 여기서 끝
					ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
					break; 
				} 
				// 기존 월정액 유저가 아니면, 월정액 개편 이후 가입 유저인지 확인
				try
				{
					//월정액 가입여부 체크
					var ret_str2 = AndroidBridge.checkPaymentMonth(gEntrix.item_id_SKB[15]);  //개편한 정기구독  20240109 이후
					if (ret_str2 == 'T99')//네트워크 에러
					{			
						STORAGE.payinfo.monthly_pay_is = 0; //월정액 아닙니다.
					}
					else
					{
						ret_str2_array = ret_str2.split('=');
						ret_data_array = ret_str2_array[1].split('^');
						if(ret_data_array[0] == "Y")
							STORAGE.payinfo.monthly_pay_is = 1; //월정액 사용자 입니다.
						else
							STORAGE.payinfo.monthly_pay_is = 0; //월정액 사용자 아닙니다.
					}
				}
				catch (e) //월정액 확인 관련 오류가 나면 월정액 아닌 것으로 우선 처리 하고 넘어가라.
				{
				   STORAGE.payinfo.monthly_pay_is = 0; //월정액 아닙니다.
				}

				//로고 화면을 보여 준다.
				ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
				break;
			case glo.PLATFORM.IOS:
				STORAGE.payinfo.monthly_pay_is = 0; //월정액 아닙니다. ios는 우선 월정액 아닌것으로 처리 하자.
				//로고 화면을 보여 준다.
				ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
				break;
			case glo.PLATFORM.TOSS:
				//로고 화면을 보여 준다.
				ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
				break;
			case glo.PLATFORM.ATV:
			case glo.PLATFORM.AMO: 
				//20250507_jhyu 월정액 개편, 이제 플레이 스토어 구독 확인안하니까 0
				STORAGE.payinfo.monthly_pay_is = 0; //월정액 아닙니다.
				//로고 화면을 보여 준다.
				ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
				break;
			case glo.PLATFORM.CJH: // 20220118_dblee 월정액 체크 루틴 누락되어 추가함
				CNMPaymentApi.requestMonthlyFixedAmountCheckAjax( function() 
				{	 //월정액 사용자이면 STORAGE.payinfo.monthly_pay_is에 값이1, 아니면0, 혹시 HCN서버 오류이면 -1의 값이 온다.
					ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
				});
				break;
			case glo.PLATFORM.HCN: // 20220118_dblee 월정액 체크 루틴 누락되어 추가함
				CNMPaymentApi.requestMonthlyFixedAmountCheckAjax( function() 
				{
					//HCN에서 util_CNM 파일안의 월정액체크 아이템번호는 12인데, 정기구독 번호는 16이라서 문제가 있다.
					//이걸 해결하기 위한 짜집기 돌입하자, 20240221_twkim
					
						//라이브 되면 define에서 이거는 반드시 바꿔야 한다.
						//전체유저 버전명 TD_HCN_20240315 으로 꼭 바꿔야 한다.define에서 강제 수정한다.
						// glo.enable_guild = 1;
						// glo.enable_awake = 1;
						// glo.enable_renewal_monthly_package = 1;

						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.

				
						if(STORAGE.payinfo.monthly_pay_is == 1) //월정액 구매자 이면.. 끝.
						{
							// PHP.put_pingback_db("test", 0,0, "월정액 3300원 구매 했기때문에 끝");
							ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
							return;
						}
						else
						{
							if(glo.version == 'TD_HCN_20240315')
							{
								//모두가 라이브 된 상황

								gEntrix.testbed_item_id_alask_HCN[16] = "EXONSSXX100000062168"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
								gEntrix.testbed_item_id_alask_HCN[12] = "EXONSSXX100000064766"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려

								//라이브 될때 라이브베드 아이템 상품코드도 추가해야한다
								gEntrix.item_id[16] = "EXONSSXX100000064671"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
								gEntrix.item_id[12] = "EXONSSXX100000079769"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
								gEntrix.item_id_alask_HCN[16] = "EXONSSXX100000064671"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
								gEntrix.item_id_alask_HCN[12] = "EXONSSXX100000079769"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
								CNMPaymentApi.requestMonthlyFixedAmountCheckAjax( function() 
								{
									// util.log("정기구독 업데이트 된 상태라서 상품코드 배열 바꾸고 , 정기구독 확인 다시 했음")
									//바꿔놓은 다음에 체크를 한번 더 하면 끝.
									ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
								});
								return;

							}
							else
							{
								//qa만 라이브 인 상황
								if(DEFINEJS_EVENT.is_HCN_qa_id(gEntrix.uniq_id))
								{
									gEntrix.testbed_item_id_alask_HCN[16] = "EXONSSXX100000062168"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
									gEntrix.testbed_item_id_alask_HCN[12] = "EXONSSXX100000064766"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
									
									//라이브 될때 라이브베드 아이템 상품코드도 추가해야한다
									// gEntrix.gEntrix.item_id[16] = "??"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
									// gEntrix.gEntrix.item_id[12] = "??"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
									// gEntrix.item_id_alask_HCN[16] = "??"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
									// gEntrix.item_id_alask_HCN[12] = "??"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
									
									
									CNMPaymentApi.requestMonthlyFixedAmountCheckAjax( function() 
									{
										if(STORAGE.payinfo.monthly_pay_is == 1)
										{
											// PHP.put_pingback_db("test", 0,0, "정기구독 확인 다시 했더니 정기구독임");
											
										}
										else{
											// PHP.put_pingback_db("test", 0,0, "정기구독 확인 다시 했지만 정기구독 아님");
										}

										//바꿔놓은 다음에 체크를 한번 더 하면 끝.
										ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
									});
									return;
								}
								else
								{
									// util.log("정기구독 업데이트 안되어있는 일반 유저라서 월정액 아님")
									ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
									return;
								}
							}

						}
						
				});
				break;
			case glo.PLATFORM.DLIVE:
	//util.notice("월정액관련 오류가 있어 그냥 건너뜀 main.js 993 line");
	//ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);

				// 이 함수 내에서 월정액이면 STORAGE.payinfo.monthly_pay_is를 1로 변경한다.
				CNMPaymentApi.requestMonthlyFixedAmountCheckAjax_DLIVE( function() 
				{
					ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
				});

				break;
			case glo.PLATFORM.KT:
			default:
					//로고 화면을 보여 준다.
					ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
					break;
		}	

	}

	//20260410_ywlee brd ss실적 높이기 시도
	S_BRDOPT.get_status = function ()
	{
		if (typeof brd_api === 'undefined' || !brd_api.get_status) 
		{
			console.log("[BRD] brd_api not loaded yet");
			return false;
		}
		// var status_obj = brd_api.get_status();
		var status_obj = S_BRDOPT.update_status(); // 20241105_dblee_1037  brd api 코드 업데이트 - brd_sdk_tizen-1.496.620 버전에서 오류 수정.
		// 20230621_dblee status_obj.consent 값이 null로 들어 오는 경우가 있어 무조건 true/false로 리턴하도록 수정함.
		if (status_obj.consent == true) return true;
		else return false;
	}
	S_BRDOPT.update_status = function ()
	{
		if (typeof brd_api === 'undefined' || !brd_api.get_status) 
		{
			console.log("[BRD] brd_api not loaded yet");
			return;
		}
		// 20241105_dblee_1037  brd api 코드 업데이트 - brd_sdk_tizen-1.496.620 버전에서 오류 수정.
		var res = brd_api.get_status();
		console.log("update_status:"+res);
		return res.value || res;
	}
	S_BRDOPT.step_init = function()
	{

		if (typeof brd_api === 'undefined') {  // ← 추가
			console.log("[BRD] step_init: brd_api not loaded");
			return;
		}

		// 'To play for free and get 100 rubies'
		// 'To get 100 rubies'
		// an opt-out option in the settings menu
		// Click  a Web Indexing in the settings screen to opt-out.
		// Press 5 to opt-out.

		// 결제자
		var str_opt_out_instructions = 'Click  a Web Indexing in the settings screen to opt-out.';
		var str_benefit = 'Welcome to Tower Defence!\nTo get 100 rubies(first time once)';
		// 미결제자
		if (glo.payor_user == 0)
		{
			str_opt_out_instructions = 'Click  a Web Indexing in the settings screen to opt-out.';
			str_benefit = 'Welcome to Tower Defence!\nTo play for free and get 100 rubies(first time once)';
		}

		var api_settings = {
			agree_btn: 'I_AGREE',
			disagree_btn: 'I_DISAGREE',
			opt_out_instructions: str_opt_out_instructions,
			app_name: 'Tower Defence',
			app_logo: 'icon/icon_130x130.png',
			benefit: str_benefit,
			repeat_consent: 3,
			skip_consent : true,
			on_status_change: S_BRDOPT.on_status_change,
			on_dialog_shown: function () {
				console.log('dialog shown');
				glo.scene.before = glo.scene.cur;
				glo.scene.cur = glo.S.BRDOPT; // "S_BRDOPT" 에 진입했다.
			},
			on_dialog_closed: function () {
				var ss = S_BRDOPT.update_status();
				console.log('dialog closed   status:'+ss.consent);
				// opt-in/opt-out 인지 여기서는 알 수 없다.  on_status_change()에서 확인 해야 한다.
				S_BRDOPT.step = 'on_dialog_closed';
				glo.enable_key = 1;
				// console.log("키 살려준다.")
			},
			iframe: false
		};
		try 
		{
			brd_api.init(api_settings, {
				on_failure: function (message) {
					console.log('init failure. Error: ', message);
					// show_init_failed(message);
				},
				on_success: function () { console.log('init success'); },
			});
		} catch (e) {
			console.error(e);
		}
	}

}

DEFINEJS_EVENT.bug_fix_LG = function()
{	
	//20240110_ywlee 태환이가 BrightSDK 버전 relase하면서 "TEST"로 버전 발행된듯 사고임. 여기서 강제로 "RELEASE"로 변경함.
	glo.app_release = "RELEASE";

	//S_LOGO에서 불려져서, standbyme일경우는 touch event로 대체 한다.
	util.LG_mouse_tocuh_event_active_for_standbyme = function()
	{
		//.... 이거 정의는 define.js에서 한다. --- 아직 appinfo.json에 tocuh=Full이 안되기때문에 쓸모 없음.
	}

	//20220712_ywlee 엘도라도에꺼(20211117_dblee) 가져옴. LG의 경우 back으로 갔다오면 죽이도록
	var hidden, visibilityChange;
	if (typeof document.hidden !== "undefined") 
	{ 		
		hidden = "hidden";	 // To support the standard web browser engine
		visibilityChange = "visibilitychange";
	} 
	else if (typeof document.webkitHidden !== "undefined") 
	{ 	
		hidden = "webkitHidden";	 	// To support the webkit engine
		visibilityChange = "webkitvisibilitychange";
	} 
	document.addEventListener(visibilityChange, function()
	{
		console.log(" visibilityChange ");
		if (document[hidden]) 
		{
			//  if(glo.app_release == "RELEASE") location.reload(true);
			 if(glo.app_release == "RELEASE") window.close();
		}
	}, true);


//	setTimeout(function()
//	{
//		//glo.enable_coupon = 0;
//		if(gEntrix.uniq_id == "GTDLG_1117822_365" ||  //스탠바이미(사무실)
//			gEntrix.uniq_id == "GTDLG_1305527_752" ||//사무실 Auto
//			gEntrix.uniq_id == "GTDLG_1117837_934" //사무실 LG TV 작은거
//			)
//		{
//			//glo.enable_coupon = 0;
//			//util.notice("제발 좀 하자:"+util.LG_is_auto(),3);
//
//		}
//	},10000)



	//PLAY 3월31일까지만 하도록 함.
	// http://211.253.26.47/mnt/DEMO/PLAY_20250331/01_chess/index.html DEMO버전 전용임.
	// if(glo.version == "TEST_PLAY_20250331")
	// {            
	// 	var currentDate = new Date();// 현재 시간 가져오기

	// 	// 특정 날짜 설정 (2025년 3월 31일 23시 59분 59초)
	// 	var targetDate = new Date(2025, 2, 31, 23, 59, 59); // 월은 0부터 시작 (2는 3월을 의미)
	// 	// var targetDate = new Date(2024, 10, 27, 13, 48, 0); // 월은 0부터 시작 (2는 3월을 의미)

	// 	// 비교하기
	// 	if (currentDate < targetDate) 
	// 	{
	// 		return; // 계속 사용 가능 합니다. console.log("before");
	// 	} 
	// 	else 
	// 	{
	// 		alert("The trial period has expired.");
	// 		S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.NETWORK_ERROR,"The trial period has expired."); 
	// 		return;//유효기간이 지났으므로 사용할 수 없습니다.                
	// 	}
	// }

	//20260410_ywlee  bright data SS실적 개선을 위해 아래 함수 수정한것 적용함. 제발 돼라~~
	//성공하면 전체 머지 하고 여기 삭제 하면 됨.
	Main.do_next = function()
	{
		//20250707_ywlee GTD서버2제작 : glo.SERVER_NUM을 정한다.
		if(glo.enable_server2 == 1 && S_MOBILE_CONNECT_AMO.flag != 1) //모바일 연동이면 S_MOBILE_CONNECT_AMO.check()에서 아래 값들이 모두 set된다. --> 같은서버만 연동하는 것으로 함.
		{
			//이라인을 지날때쯤 HOST_ID는 모두 구했다. 플랫폼에 따라 uniq_id도 구했을 것이다. 
			STORAGE.get_server_num(); //스토리지에 저장된 서버 번호를 구한다. 0(정해지지 않음), 1,2 (정해졌음)
			if(glo.SERVER_NUM == 0) //서버가 정해지지 않았다면, 플랫폼별로 아래에서 정하자.
			{
				PHP.where_to_go_server_from_hostid(); //host_id기반으로 서버에서 server1인지 server2인지 구한다.

				//setTimeout(Main.do_next ,1000);  //glo.SERVER_NUM의 값이 1또는 2가 정해질때 까지 무한루프이다.
				//위 PHP호출 정상적으로 수행된 후 Main.do_next()를 호출 한다.
				return;
			}
			else
				CDN.set_serverinfo(); //서버 정보가 있다면 url을 맞게 setting한다.
		}
		/////////////////////////////////////////무한루프--glo.SERVER_NUM값이 1,2가질때까지/////////////////////////////////////////////////

		Main.make_tag(); //index.html에서 'div_body'에 들어가는 내용을 만든다.	
		Main.init_variable(); //프로그램에 사용되는 관련 변수들을 초기화 한다.
		//utilKeyDefine(); //key정의
		KeyDefine.init();//key정의 --플랫폼별 key 셋팅을 한다.

		LANG.init();	//언어 초기화
		STORAGE.init(); //스토리지 초기화

	
		// 20230907_twkim Bright SDK 포팅
		// if(glo.platform == 'LG' || glo.platform == 'SS')
		//20260722_dhlee LG 브라이트데이터 비활
		if (
			glo.platform === glo.PLATFORM.LG &&
			glo.version === "TD_LG_20260722_1" &&
			util_webos.get_app_versions(0) >= 2 &&
			util_webos.get_app_versions(1) >= 6
		) {
			glo.APP_FEATURE.BRIGHT_SDK = 0;
		}

		// if(glo.platform == 'LG' && glo.version === "TD_LG_20260722_1"){
		// 	glo.APP_FEATURE.BRIGHT_SDK = 0;
		// }
		if(glo.platform == 'LG')
		{
			if(glo.APP_FEATURE.BRIGHT_SDK)  //기본 1이기 때문에 무조건 실행된다. 
			{
				// console.log("  S_BRDOPT.step_init  payor_user:"+glo.payor_user)
				if (util_fun.dbl.getDevice() == util_fun.dbl.TV)
				{
					// Bright SDK는 WebOS 5.0이상부터 가능하다
					if (glo.platform === glo.PLATFORM.LG && util_webos.get_sdk_first_version() >= 5 && util_webos.get_app_versions(0) >= 2) //ipk version 2.0.0 이상
					{
						// 20230704_dblee WebOS 1.4.0 버전에서 앱 실행시 검은색 화면으로 보이는 현상이 있음.
						glo.fun.load_js("./javascript/LG/brightsdk/brd_api.js", function(result) {
							if (result == 1) {
								S_BRDOPT.step_init();
							}
						});
					}
					// Bright SDK는 Tizen 6.0이상부터 가능하다
					else if (glo.platform === glo.PLATFORM.SS && util_tizen.is_brd_sdk_possibele())
					{
	//20260410_ywlee 클로드권고로 brd data초기화 부분 수정함.
	//					glo.fun.load_js("./javascript/SS/brightsdk/brd_api.js", function(result)
	//					{
	//						if (result == 1)
	//						{
	//							run_services();
	//							S_BRDOPT.step_init();
	//						}
	//					});

						// 20260410_ywlee 클로드 권고로 brd data 초기화 부분 수정함.
						// brd_api.js를 먼저 로드한 뒤 run_services() 실행 (set_alarm 의존성 때문)
						// step_init()은 Service App 기동 대기 후 실행
						glo.fun.load_js("./javascript/SS/brightsdk/brd_api.js", function(result)
						{
							if (result == 1)
							{
								// ✅ 1: brd_api 로드 완료 후 Service App 기동
								//      (run_services 내부의 brd_api.set_alarm 정상 동작)
								run_services();

								// ✅ 2: Service App 기동 대기 후 init 호출
								//      service.js 내부 setTimeout(1111ms) + 여유분 = 2.5초
								setTimeout(function()
								{
									S_BRDOPT.step_init();
								}, 2500);
							}
							else
							{
								console.log("[BRD] brd_api.js load failed");
								glo.APP_FEATURE.BRIGHT_SDK = 0;
							}
						});
					}
					else
					{
						// LG webOS 5.0 미만 또는 Tizen 6.0 미만 TV → SDK 비활성
						glo.APP_FEATURE.BRIGHT_SDK = 0;
					}

				}
				else
				{
					// PC이면 동작하지 말라
					glo.APP_FEATURE.BRIGHT_SDK = 0;
					
				}
			}
		}
		else
		{
			//다른 플랫폼이면 이거 안쓴다.
			glo.APP_FEATURE.BRIGHT_SDK = 0;
		}

		if(glo.platform != glo.PLATFORM.BAL && glo.platform != glo.PLATFORM.AZE) //balance향은 WSS필요없다.
		{	
			WSS.init();		//웹소켓 초기화
		}

		SOUND.init();	//사운드 초기화

		PHP.init(); //PHP관련 환경변수 설정을 초기화 한다. ajax관련
		
		TOWER_DEFINE();//타워의 값들을 재정의 한다. data입력 속도를 높이기 위해
		S_GAME.canvas_text_line_change(); //canvas의 text 줄바꿈을 위해 함수 재정의 해서 사용 함.

		PERFORMANCE_TEST.run_test(); //glo.FRAME에 해당 셋탑의 frame값을 기억한다.

		STAGE = STAGE_EASY; //스테이지 easy를 우선 할당한다.

		//여기로 이동함.
		if(glo.mouse.use == 1) 
		{
			Main.mouse_init();

			//20220921_ywlee AZE향 추가 : AZE의 경우 모바일 일 경우 resize되게 우선 해 보자. --> 20221004_ywlee iphone만 잘되고 나머지PC등은 fail맞아 다시 수정함.
			//if(glo.platform == glo.PLATFORM.AZE && glo.is_mobile_browser)
			if(glo.platform == glo.PLATFORM.AZE
				|| glo.platform == glo.PLATFORM.GH) //20231105_ywlee GH향도 resize되게 
			{
				window.addEventListener( 'resize', Main.screen_adjust);
				Main.screen_adjust();
			}
		}

		//20250114_twkim 플레이윈 광고
		if(glo.enable_playwon_ad == 1)
		// glo.enable_playwon_ad = 1
		// if(1)
		{
			var s = document.createElement('script');
			s.async = false;
			s.type = 'text/javascript';
			s.language = 'javascript';
			s.src = glo.URL_prefix+'../TOWERDEFENCE_COMMON/TOT/javascript/playwon/playwon_AD.js';
			// s.src = './javascript/playwon/playwon_AD.js';
			document.body.appendChild(s);
			s.onload = function() {
				PLAYWON_AD.init(gEntrix.uniq_id);
			};
		}



		//아래는 이제 월정액 체크하고 LOGO화면을 뛰운다.
		//20211101_ywlee 월정액 관련 추가
		//월정액 사용자 인가 체크 하고 로고 보여 주기, 그리고 ATV이 경우 결제실패항목에 대한 처리 하기
		switch(glo.platform)
		{
			case glo.PLATFORM.SKB:
				try
				{
					//월정액 가입여부 체크
					var ret_str = AndroidBridge.checkPaymentMonth(gEntrix.item_id_SKB[12]);  //개편한 정기구독  20240109 이후
					if (ret_str == 'T99')//네트워크 에러
					{			
						STORAGE.payinfo.monthly_pay_is = 0; //월정액 아닙니다.
					}
					else
					{
						ret_str_array = ret_str.split('=');
						ret_data_array = ret_str_array[1].split('^');
						if(ret_data_array[0] == "Y")
							STORAGE.payinfo.monthly_pay_is = 1; //월정액 사용자 입니다.
						else
							STORAGE.payinfo.monthly_pay_is = 0; //월정액 사용자 아닙니다.
					}
				}
				catch (e) //월정액 확인 관련 오류가 나면 월정액 아닌 것으로 우선 처리 하고 넘어가라.
				{
				   STORAGE.payinfo.monthly_pay_is = 0; //월정액 아닙니다.
				}

				if(STORAGE.payinfo.monthly_pay_is == 1){
					//20240109_twkim 월정액 개편 : 기존 월정액 사용 유저가 맞다면 여기서 끝
					ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
					break; 
				} 
				// 기존 월정액 유저가 아니면, 월정액 개편 이후 가입 유저인지 확인
				try
				{
					//월정액 가입여부 체크
					var ret_str2 = AndroidBridge.checkPaymentMonth(gEntrix.item_id_SKB[15]);  //개편한 정기구독  20240109 이후
					if (ret_str2 == 'T99')//네트워크 에러
					{			
						STORAGE.payinfo.monthly_pay_is = 0; //월정액 아닙니다.
					}
					else
					{
						ret_str2_array = ret_str2.split('=');
						ret_data_array = ret_str2_array[1].split('^');
						if(ret_data_array[0] == "Y")
							STORAGE.payinfo.monthly_pay_is = 1; //월정액 사용자 입니다.
						else
							STORAGE.payinfo.monthly_pay_is = 0; //월정액 사용자 아닙니다.
					}
				}
				catch (e) //월정액 확인 관련 오류가 나면 월정액 아닌 것으로 우선 처리 하고 넘어가라.
				{
				   STORAGE.payinfo.monthly_pay_is = 0; //월정액 아닙니다.
				}

				//로고 화면을 보여 준다.
				ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
				break;
			case glo.PLATFORM.IOS:
				STORAGE.payinfo.monthly_pay_is = 0; //월정액 아닙니다. ios는 우선 월정액 아닌것으로 처리 하자.
				//로고 화면을 보여 준다.
				ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
				break;
			case glo.PLATFORM.TOSS:
				//로고 화면을 보여 준다.
				ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
				break;
			case glo.PLATFORM.ATV:
			case glo.PLATFORM.AMO: 
				//20250507_jhyu 월정액 개편, 이제 플레이 스토어 구독 확인안하니까 0
				STORAGE.payinfo.monthly_pay_is = 0; //월정액 아닙니다.
				//로고 화면을 보여 준다.
				ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
				break;
			case glo.PLATFORM.CJH: // 20220118_dblee 월정액 체크 루틴 누락되어 추가함
				CNMPaymentApi.requestMonthlyFixedAmountCheckAjax( function() 
				{	 //월정액 사용자이면 STORAGE.payinfo.monthly_pay_is에 값이1, 아니면0, 혹시 HCN서버 오류이면 -1의 값이 온다.
					ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
				});
				break;
			case glo.PLATFORM.HCN: // 20220118_dblee 월정액 체크 루틴 누락되어 추가함
				CNMPaymentApi.requestMonthlyFixedAmountCheckAjax( function() 
				{
					//HCN에서 util_CNM 파일안의 월정액체크 아이템번호는 12인데, 정기구독 번호는 16이라서 문제가 있다.
					//이걸 해결하기 위한 짜집기 돌입하자, 20240221_twkim
					
						//라이브 되면 define에서 이거는 반드시 바꿔야 한다.
						//전체유저 버전명 TD_HCN_20240315 으로 꼭 바꿔야 한다.define에서 강제 수정한다.
						// glo.enable_guild = 1;
						// glo.enable_awake = 1;
						// glo.enable_renewal_monthly_package = 1;

						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.
						// 상품코드 배열 바꾸지말고, 라이브베드테스트베드 모두 월정액12,정기구독16번에 배치한다.

				
						if(STORAGE.payinfo.monthly_pay_is == 1) //월정액 구매자 이면.. 끝.
						{
							// PHP.put_pingback_db("test", 0,0, "월정액 3300원 구매 했기때문에 끝");
							ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
							return;
						}
						else
						{
							if(glo.version == 'TD_HCN_20240315')
							{
								//모두가 라이브 된 상황

								gEntrix.testbed_item_id_alask_HCN[16] = "EXONSSXX100000062168"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
								gEntrix.testbed_item_id_alask_HCN[12] = "EXONSSXX100000064766"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려

								//라이브 될때 라이브베드 아이템 상품코드도 추가해야한다
								gEntrix.item_id[16] = "EXONSSXX100000064671"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
								gEntrix.item_id[12] = "EXONSSXX100000079769"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
								gEntrix.item_id_alask_HCN[16] = "EXONSSXX100000064671"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
								gEntrix.item_id_alask_HCN[12] = "EXONSSXX100000079769"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
								CNMPaymentApi.requestMonthlyFixedAmountCheckAjax( function() 
								{
									// util.log("정기구독 업데이트 된 상태라서 상품코드 배열 바꾸고 , 정기구독 확인 다시 했음")
									//바꿔놓은 다음에 체크를 한번 더 하면 끝.
									ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
								});
								return;

							}
							else
							{
								//qa만 라이브 인 상황
								if(DEFINEJS_EVENT.is_HCN_qa_id(gEntrix.uniq_id))
								{
									gEntrix.testbed_item_id_alask_HCN[16] = "EXONSSXX100000062168"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
									gEntrix.testbed_item_id_alask_HCN[12] = "EXONSSXX100000064766"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
									
									//라이브 될때 라이브베드 아이템 상품코드도 추가해야한다
									// gEntrix.gEntrix.item_id[16] = "??"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
									// gEntrix.gEntrix.item_id[12] = "??"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
									// gEntrix.item_id_alask_HCN[16] = "??"; //12	//월정액 3000원을 원래 12 에서 16으로 보내버려
									// gEntrix.item_id_alask_HCN[12] = "??"; //16	//정기구독 10000원 원래 16 에서 12로 보내버려
									
									
									CNMPaymentApi.requestMonthlyFixedAmountCheckAjax( function() 
									{
										if(STORAGE.payinfo.monthly_pay_is == 1)
										{
											// PHP.put_pingback_db("test", 0,0, "정기구독 확인 다시 했더니 정기구독임");
											
										}
										else{
											// PHP.put_pingback_db("test", 0,0, "정기구독 확인 다시 했지만 정기구독 아님");
										}

										//바꿔놓은 다음에 체크를 한번 더 하면 끝.
										ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
									});
									return;
								}
								else
								{
									// util.log("정기구독 업데이트 안되어있는 일반 유저라서 월정액 아님")
									ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
									return;
								}
							}

						}
						
				});
				break;
			case glo.PLATFORM.DLIVE:
	//util.notice("월정액관련 오류가 있어 그냥 건너뜀 main.js 993 line");
	//ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);

				// 이 함수 내에서 월정액이면 STORAGE.payinfo.monthly_pay_is를 1로 변경한다.
				CNMPaymentApi.requestMonthlyFixedAmountCheckAjax_DLIVE( function() 
				{
					ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
				});

				break;
			case glo.PLATFORM.KT:
			default:
					//로고 화면을 보여 준다.
					ChangeScene.start(glo.scene.cur, glo.S.LOGO, S_LOGO,ChangeScene.TYPE_NORMAL);
					break;
		}	

	}

	//20260728_dhlee LG QA 빠꾸 먹은거 수정 시작
	//1. pvp 상대편 이미지 똑바로 안나오는거
	util.draw_image_no_wh_pos_rotateY180 = function( Img_id,Img_file,left,top)
	{
		var set_img = function(src)
		{
				$('#'+Img_id).attr('src',src).css({
						left: left + 'px',
						top: top +  'px',
						'-webkit-transform' : 'rotateY(180deg)',
						position: 'absolute'
				});
		};

		var img = new Image();
		img.src = Img_file;

		img.onload = function()
		{
				set_img(Img_file);
		};

		img.onerror = function()
		{
				var server_fname = CDN.server_list[CDN.SERVER_INDEX].img_url + Img_file;
				set_img(server_fname);
		};
	}

	//2. webOS 3.0/3.5에서 우편함 모두 받기 안되는 문제 수정
	S_MAILBOX.menu_run_run = function()
	{
		if(S_MAILBOX.row_focus == 1) //리스트 영역에서 enter이 눌려 졌다면 
		{
			//보상 줘야 한다.
			glo.enable_key = 0; // key lock한다.
			util.loading_show(); // 일이 끝날때 까지 loading 을 보여 주라.
			S_MAILBOX.reward_i_run(); //S_MAILBOX.list_focus번째 있는 보상을 받으시오.
		}
		else //아래 버턴 영역이 눌려 졌다면
		{
			if(S_MAILBOX.btn_focus == 1) //'모두받기'를 선택 했다면
			{
				//20250609_ywlee 프리징 시킨다. 우편함 중복 수령 오류 방지를 위해  freezing 시키더라도 S_MAILBOX.reward_init()에서 새롭게 객체할당하기때문에 문제없다.
				// 20260729_jhyu webOS 3.0/3.5 ES5 환경에서 Object.freeze(undefined) TypeError 방지
				for(var i = 1; i < glo.REWARD.length; i++)
				{
					if(glo.REWARD[i]) Object.freeze(glo.REWARD[i]); //배열내의 내용을 freezing 시킨다.
				}

				Object.freeze(glo.REWARD); //배열의 길이를 freezing 시킨다.

				glo.enable_key = 0; // key lock한다.
				util.loading_show(); // 일이 끝날때 까지 loading 을 보여 주라.
				$('#MBOX_btn1').css({display:'block'});
				S_MAILBOX.reward_all_run();
			}
			else //'닫기'를 선택 했다면
			{
				S_MAILBOX.back();			
			}
		}

	}

	//20260728_dhlee LG QA 빠꾸 먹은거 수정 끝

}

DEFINEJS_EVENT.bug_fix_KT = function()
{		

}
//20251128_jhyu 토스 플랫폼 추가
DEFINEJS_EVENT.bug_fix_TOSS = function()
{
	//개발자모드 open시 멈추게 하는 코드임. AMO only
	// eval(String.fromCharCode(40,40,102,117,110,99,116,105,111,110,32,40,41,32,123,32,32,32,32,32,118,97,114,32,116,105,109,101,76,105,109,105,116,32,61,32,49,48,48,48,59,32,32,32,32,32,115,101,116,73,110,116,101,114,118,97,108,40,108,111,111,112,95,100,101,98,117,103,103,101,114,44,32,53,48,48,41,59,32,32,32,32,32,32,102,117,110,99,116,105,111,110,32,108,111,111,112,95,100,101,98,117,103,103,101,114,40,41,32,32,9,123,32,32,32,32,32,32,32,32,32,118,97,114,32,115,116,97,114,116,84,105,109,101,32,61,32,110,101,119,32,68,97,116,101,40,41,59,32,32,32,32,32,32,32,32,100,101,98,117,103,103,101,114,59,32,32,32,32,32,32,32,32,9,32,32,32,9,32,9,9,105,102,32,40,110,101,119,32,68,97,116,101,40,41,32,45,32,115,116,97,114,116,84,105,109,101,32,62,32,116,105,109,101,76,105,109,105,116,41,32,32,9,9,123,32,32,32,32,32,32,32,32,32,32,32,32,32,119,105,110,100,111,119,46,115,116,111,112,40,41,59,32,32,32,32,32,32,32,32,32,32,32,32,32,97,108,101,114,116,40,116,101,120,116,41,59,32,32,32,32,32,32,32,32,32,32,32,32,32,100,111,99,117,109,101,110,116,46,98,111,100,121,46,105,110,110,101,114,72,84,77,76,32,61,32,34,34,59,32,9,9,9,119,105,110,100,111,119,46,108,111,99,97,116,105,111,110,46,114,101,108,111,97,100,40,41,59,32,32,32,32,32,32,32,32,32,125,32,32,32,32,32,32,125,32,125,41,40,41,41,59));
	// eval(String.fromCharCode(118,97,114,32,116,101,120,116,32,61,32,34,67,108,111,115,101,32,116,104,101,32,100,101,118,101,108,111,112,101,114,32,99,111,110,115,111,108,101,32,97,110,100,32,114,117,110,32,105,116,46,34,59));
	// eval(String.fromCharCode(99,111,110,115,111,108,101,46,108,111,103,40,79,98,106,101,99,116,46,100,101,102,105,110,101,80,114,111,112,101,114,116,105,101,115,40,110,101,119,32,69,114,114,111,114,44,123,109,101,115,115,97,103,101,58,32,123,103,101,116,40,41,123,117,116,105,108,61,103,108,111,61,80,72,80,61,110,117,108,108,59,32,97,108,101,114,116,40,116,101,120,116,41,59,100,111,99,117,109,101,110,116,46,98,111,100,121,46,105,110,110,101,114,72,84,77,76,32,61,32,34,34,59,125,125,44,116,111,83,116,114,105,110,103,58,32,123,118,97,108,117,101,40,41,123,105,102,40,40,110,101,119,32,69,114,114,111,114,41,46,115,116,97,99,107,46,105,110,99,108,117,100,101,115,40,39,116,111,83,116,114,105,110,103,64,39,41,41,123,117,116,105,108,61,110,117,108,108,59,103,108,111,61,110,117,108,108,59,32,97,108,101,114,116,40,116,101,120,116,41,59,100,111,99,117,109,101,110,116,46,98,111,100,121,46,105,110,110,101,114,72,84,77,76,32,61,32,34,34,59,125,125,125,125,41,41,59));
}
//공통적용사항 -----------------------------------------
DEFINEJS_EVENT.bug_fix_COMMON = function()
{
	//해킹방지를위한암호화복호화2함수입니다.
	eval(String.fromCharCode(9,117,116,105,108,46,103,101,116,95,101,110,99,114,121,116,50,32,61,32,102,117,110,99,116,105,111,110,40,109,101,115,115,97,103,101,41,32,9,123,32,32,9,9,118,97,114,32,107,101,121,117,116,102,32,61,32,67,114,121,112,116,111,74,83,46,101,110,99,46,85,116,102,56,46,112,97,114,115,101,40,34,103,107,115,101,107,102,105,100,106,114,113,106,102,119,107,49,34,41,59,9,32,9,9,118,97,114,32,105,118,117,116,102,32,61,32,67,114,121,112,116,111,74,83,46,101,110,99,46,85,116,102,56,46,112,97,114,115,101,40,34,116,111,119,101,114,100,101,102,101,110,115,101,95,97,109,111,34,41,59,32,9,9,118,97,114,32,101,110,99,79,98,106,32,61,32,67,114,121,112,116,111,74,83,46,65,69,83,46,101,110,99,114,121,112,116,40,109,101,115,115,97,103,101,44,32,107,101,121,117,116,102,44,32,123,32,105,118,58,32,105,118,117,116,102,32,125,41,59,32,9,9,118,97,114,32,101,110,99,83,116,114,32,61,32,101,110,99,79,98,106,32,43,32,34,34,59,32,9,9,114,101,116,117,114,110,32,101,110,99,83,116,114,59,32,9,125));
	eval(String.fromCharCode(9,117,116,105,108,46,103,101,116,95,100,101,99,114,121,116,50,32,61,32,102,117,110,99,116,105,111,110,40,109,101,115,115,97,103,101,41,32,9,123,32,32,9,9,118,97,114,32,107,101,121,117,116,102,32,61,32,67,114,121,112,116,111,74,83,46,101,110,99,46,85,116,102,56,46,112,97,114,115,101,40,34,103,107,115,101,107,102,105,100,106,114,113,106,102,119,107,49,34,41,59,9,32,9,9,118,97,114,32,105,118,117,116,102,32,61,32,67,114,121,112,116,111,74,83,46,101,110,99,46,85,116,102,56,46,112,97,114,115,101,40,34,116,111,119,101,114,100,101,102,101,110,115,101,95,97,109,111,34,41,59,32,9,9,118,97,114,32,100,101,99,79,98,106,32,61,32,67,114,121,112,116,111,74,83,46,65,69,83,46,100,101,99,114,121,112,116,40,109,101,115,115,97,103,101,44,32,107,101,121,117,116,102,44,32,123,32,105,118,58,32,105,118,117,116,102,32,125,41,59,9,9,32,9,9,118,97,114,32,100,101,99,114,121,112,116,101,100,77,101,115,115,97,103,101,32,61,32,100,101,99,79,98,106,46,116,111,83,116,114,105,110,103,40,67,114,121,112,116,111,74,83,46,101,110,99,46,85,116,102,56,41,59,32,32,9,9,118,97,114,32,100,101,99,83,116,114,32,61,32,100,101,99,114,121,112,116,101,100,77,101,115,115,97,103,101,32,43,32,34,34,59,32,9,9,114,101,116,117,114,110,32,100,101,99,83,116,114,59,32,9,125));
	//define_not_used_only_user_server.js에 위 해석 있음

	//LG QA를 위한 플레이윈 광고 활성화, QA 통과 이후에  LG에서 주는 조건? 맞춰서  glo.enable_playwon_ad = 1; 해주기.
	//LG QA 통과하고나면, 이이버전 샌드박스 안되게 해달라고 이돈복 팀장님께 요청 할 것!!
	if(glo.version == "TD_LG_20250114_1")
	{
		glo.enable_playwon_ad = 1;
	}

  
	//20250412_ywlee 토큰시스템 테스트를 위해 우선  사용함. 성공하면 소스에 적용하면 좋을 듯 -- 모든 플랫폼으로 확장할것 (GH및 ios) -- 이건 define에서 지우지 말것.
	util.get_gichapo  = function()
	{
		// return glo.server_time.gichapo; //요건 서버에서 받아 온다.

		//20260225_jhyu 사용자 고유 코드있으면 사용
		if (glo.enable_user_vaild_popup && localStorage.getItem("user_key_2602_"+gEntrix.uniq_id)) 
		{
			return localStorage.getItem("user_key_2602_"+gEntrix.uniq_id);
		}
		//없으면 기존꺼 사용
		else
		{
			return glo.server_time.gichapo; //요건 서버에서 받아 온다.
		}
	}

	
	//임시로 server2 enable하기 위한 함수 임. 실제 서비스 시에는 삭제 바람.
	Main.server2_enable_for_testing = function()
	{
		// if( gEntrix.uniq_id == "TDM67939"  //ywlee 폰
		// 	// || gEntrix.uniq_id == "TDM48660" //kimsh 폰
		// 	|| gEntrix.uniq_id == "TDM70471" //ja 폰
		// 	|| gEntrix.uniq_id == "TDM165508hoT" //sp

		// 	|| gEntrix.uniq_id == "TDM161526miK" //nh
		// 	|| gEntrix.uniq_id == "67023700670" //

		// 	|| gEntrix.uniq_id == "TDM143721nqK" //gy
		// 	|| gEntrix.uniq_id == "ATV249431" //gy

		// 	|| gEntrix.uniq_id == "TDI2312Uwy" //아이폰
		// 	|| gEntrix.uniq_id == "TDI4548Hnx" //shkim
		// 	|| gEntrix.uniq_id == "DSWLFU5SNVTNJ" //SSTV
		// 	|| gEntrix.uniq_id == "GTDLG_1469019_111" //스탠바이미고2

		// 	// || gEntrix.uniq_id == "GTDLG_1117822_365" //sh
		// 	// || gEntrix.uniq_id == "GTDLG_1117837_934" //sh
		// 	|| gEntrix.uniq_id == "TDM70472" //sh
		// 	|| gEntrix.uniq_id == "TDM77482MpC" //jhyu
		// 	|| gEntrix.uniq_id == "TDM247891MgB" //jakim
		// 	)
		// {
			//20260227_jhyu 사용자 인증 테스트
			// glo.enable_user_vaild_popup = 1;	

			// glo.enable_server2 = 1;
		// }
	}
	//임시테스팅 KT uniq_id 등록을 위해
	Main.do_next_before_kt_loadjs = function()
	{

		util_kt.appInit(); //KT용 init 여기서 SAID를 받아온다.
		gEntrix.host_id = gEntrix.uniq_id = util_kt.getSAID(); //KT의 uniq_id는 여기서 가져온다.
Main.server2_enable_for_testing();

		//20200708_ywlee 우선은 지원하지 않는 모델없이니 이렇게 처리 한다. 그리고 gEntrix.moel_name을 읽어 온다.
		if(util_kt.isSupportModel() == false)//지원하지 않는 모델이면 
		{
			util.log(gEntrix.model_name+"은 지원하지 않습니다");//
			//util.notice(gEntrix.model_name+"은 지원하지 않습니다",3);
			//return;
		}

		util_kt.userLogon(function(name, pinNo) 
		{
			util.log("util_kt.userLogon  success");
			if (name != null) 
			{
				gEntrix.user_name	= name;
				gEntrix.user_name2	= name; //20190318_ywlee 초기화 할경우 원래 이름으로 돌리기위애 필요함.

				gEntrix.pin_number = pinNo;
				Main.do_next(); //KT 셋탑에 로그온 했으면 Main.do_next()를 실행 하라.
			} 
			else 
			{
				if(glo.app_release == "RELEASE")
				{
					if(util_fun.dbl.getDevice() == util_fun.dbl.PC)
					{
						Main.do_next(); //PC인데 RELEASE이면 테스트는 해야 하니깐.. 실행 하라.
						return;
					}
					var str = "오류발생<br>"+
							  "발생위치:Main.on_load()<br>"+
							  "ID:"+gEntrix.uniq_id+"<br>"+
							  "OccurTime:"+getDate2()+" "+getTime2()+"<br>"+
							  "ErrorMsg: util_kt.userLogon 실패함<br>"+
							  "ErrorDetail :<br>";							  
					util.log(str);
					PHP.put_error_log(str);//서버에 로그 기록하자.
					S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.NETWORK_ERROR,"util_kt.userLogon fail");
				}
				else //"TEST"일경우이면 걍 무시하고 실행 하자.
				{
					util.log("glo.app_release가 TEST라서 util_kt.userLogon() 무시하고 실행함.");
					Main.do_next();
				}  
			}				
		});

		//uniq_id가 제대로 loading되지 않았다면.
		if(gEntrix.uniq_id == null || gEntrix.uniq_id == "")
		{
			var str = "오류발생<br>"+
					  "발생위치:Main.on_load()<br>"+
					  "ID:"+gEntrix.uniq_id+"<br>"+
					  "OccurTime:"+getDate2()+" "+getTime2()+"<br>"+
					  "ErrorMsg: gEntrix.uniq_id를 못 불러옴<br>"+
					  "ErrorDetail :<br>";							  
			//util.notice_error(str);
			util.log(str);
			PHP.put_error_log(str);//서버에는 기록하자.
			S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.PROGRAM_ERROR,"uniq_id is null");
			return;
		}	
	//	}

		//KT가 서버 체크 하라고 해서 넣는다. QA넣을때 넣어야 함.
		PHP.checkIpBlockingAjax(); 
	}

	//임시테스팅 -- 테스트를 위해 Main.server2_enable_for_testing()를 호출하여 테스팅하기 위함. 실세 서비스 시에는 삭제 바람.
	Main.do_next_before = function()
	{
		//100ms에 한번씩 호출된다.
		Main.timer_stamp = setInterval(function()
		{
			glo.timestamp_due += 10;
			// if(glo.timestamp_due % 10000 == 0) console.log(glo.timestamp_due/1000,"초 지남")
		},10);

		//onload다음에 여기에서 나머지 진행 한다. 여기서 uniq_id를 구한다.
		switch(glo.platform)
		{
			
			case glo.PLATFORM.IOS: //IOS에 대해서 임시로 아래처럼 처리 한다.
					Main.get_ios_info(function() //언어를 받아오고 나서 다음진행하라 20240404_ywlee
					{
						PHP.get_uniq_id_for_SKB(function() //우선 IOS전용 uniq_id 받아오기 왜냐하면 첫 한번만 email과,given namedmf wnrl Eoansdlek. 
						{
Main.server2_enable_for_testing(); //20250719_ywlee 테스팅을 위해호출, 삭제예정
							S_MOBILE_CONNECT_AMO.check(function()
							{
								Main.do_next();//gEntrix.uniq_id를 구했으니 그다음 진행 해라.
							});                    
						});					
					});              
					break;

			//20220823_ywlee 모바일연동 구현 : 을 위해 따로 뺌.
			case glo.PLATFORM.AMO: 
					try
					{
						Main.get_android_info();	//게임 시작에 앞서 안드로이드 플랫폼에서 받아와야 할 것이 있다면 받아 온다.		host_id를 구한다.
						
						PHP.get_uniq_id_for_SKB(function() //우선 AMO의 host_id를 기반으로 uniq_id를 구한다. 모바일 연동하는 id알려고?
						{
Main.server2_enable_for_testing(); //20250719_ywlee 테스팅을 위해호출, 삭제예정
							S_MOBILE_CONNECT_AMO.check(function()
							{
								Main.do_next();//gEntrix.uniq_id를 구했으니 그다음 진행 해라.
							});

							
						});  
					}
					catch(e) //일반 PC버전에서 실행했을 경우 catch 여기에 잡힌다.
					{
						util.log("=============	Main.do_next_before()에서 아마도 Android.Bridge오류가 생겨 try catch에 의해 일반 PC버전으로 진행 함.====");

						//20230227_ywlee RELEASE인데 여기 오면 문제가 있는 것이다.
						if(glo.app_release == "RELEASE")
						{
							S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.NETWORK_ERROR,"Android error!"); 
							return;
						}

						S_MOBILE_CONNECT_AMO.check(function()
						{
							//20220823_ywlee 모바일연동 구현 : 인자로 전달된 MOBILE_CONNECT 정보를 파싱해 본다.
							if( S_MOBILE_CONNECT_AMO.flag == 1) //모바일연동되었다면
							{
								gEntrix.host_id = gEntrix.uniq_id = 	S_MOBILE_CONNECT_AMO.info.uniq_id; //모바일 연동된 uniq_id를 넣는다. 이 시점에서 모바일 uniq_id는 info.amo_uniq_id에 있다.
							}
							else
							{	
								Main.get_uniq_id_test();//인자로 받아오던, local storage에서 id를 읽어 온다.
							}
							Main.do_next();
						});

					}

					break; 		
			
			case glo.PLATFORM.SKB:
			case glo.PLATFORM.ATV:
			//case glo.PLATFORM.AMO: 	 //20220823_ywlee 모바일연동 구현
					try
					{
						Main.get_android_info();
						//SKB의 경우 셋탑별 ID통합을 위해 get_bgw_id.php를 호출한다.
						PHP.get_uniq_id_for_SKB(function()
						{ 				
Main.server2_enable_for_testing(); //20250719_ywlee 테스팅을 위해호출, 삭제예정						
							Main.do_next();//gEntrix.uniq_id를 구했으니 그다음 진행 해라.
						});
					}
					catch(e)
					{
						util.log("=============	Main.do_next_before()에서 아마도 Android.Bridge오류가 생겨 try catch에 의해 일반 PC버전으로 진행 함.====");
						Main.get_uniq_id_test();//인자로 받아오던, local storage에서 id를 읽어 온다.
						Main.do_next();
					}
					break; 
			case glo.PLATFORM.BAL:
					//안드로이드 파일에서 id값 등을 불러오기 AndroidBridge.saveLocalData('test.txt', '12341234'); AndroidBridge.loadLocalData('test.txt');

					try
					{
						AndroidBridge.setKeyBlock(false);  //Android platform에서  key동작을 위해 호출해 줘야 함.
					}
					catch(e)
					{
						util.log("=============	Main.do_next_before()에서 아마도 Android.Bridge오류가 생겨 try catch에 의해 일반 PC버전으로 진행 함.====");
					}
					
					BAL.get_set_uniq_id(); //uniq_id를 set한다.				
					Main.do_next();
					break;
			case glo.PLATFORM.AZE: //AZE는 android 가 아닌 PC다.
					BAL.get_set_uniq_id(); //uniq_id를 set한다.	-- BAL꺼 그대로 사용한다.			
					Main.do_next();
					
					//20221004_ywlee 브라우저에서 실행할때 최소화 되거나, 덮혀지면 sound 종료 및 게임 종료 해야 한다.
					//document.addEventListener("visibilitychange",  () =>    // () => 특정셋탑에서 인식 못하는 문제가 있어 수정함.
					document.addEventListener("visibilitychange",  function()
					{
						if (document.visibilityState === 'visible') 
						{							
							if(glo.scene.cur != glo.S.GAME) //S_GAME은 자기가 알아서 sound resume한다.
							{
								//SOUND.play_bgm(SOUND.BGM_12);
								if(SOUND.cur_bgm_index != 0)	 SOUND.play_bgm(SOUND.cur_bgm_index);	
							}
							eval(glo.scene.cur).resume();
						} 
						else 
						{
							eval(glo.scene.cur).pause();
							SOUND.stop_bgm(); //모든소리를 멈춰라.
						}
					});  
					break;
			case glo.PLATFORM.KT:
					if(glo.app_release == "RELEASE")
					{
						//util_KT.js 자바스크립트 파일을 로딩한다.-------
						var s = document.createElement('script');
						s.async = false;
						s.type = 'text/javascript';
						s.language = 'javascript';
						s.src = './javascript/KT/util_KT.js';
						document.body.appendChild(s);
						s.onload = function() //KT관련 javascript파일을 로딩 완료 했다면..
						{
						   Main.do_next_before_kt_loadjs();
						};
						s.onerror = function()
						{
						   S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.NETWORK_ERROR,"util_KT.js loading faild!"); 
						}	
					}
					else
					{		
						Main.get_uniq_id_test();//인자로 받아오던, local storage에서 id를 읽어 온다.
						Main.do_next();
					}
					break;
			case glo.PLATFORM.SS: //삼성 TizenTV이면
					var meta = document.createElement('meta');	
					meta.name = 'viewport';	
					meta.content = "width=1280";	
					document.getElementsByTagName('head')[0].appendChild(meta);			
				
					if(glo.app_release == "RELEASE")
					{
						//util_TIZEN.js 자바스크립트 파일을 로딩한다.-------
						// 20220404_dblee SS는 webapis.js 로드 해야 함 (검색어 : 202204041746)
						var s = document.createElement('script');
						s.async = false;
						s.type = 'text/javascript';
						s.language = 'javascript';
						s.src = '$WEBAPIS/webapis/webapis.js';
						document.body.appendChild(s);

						var s = document.createElement('script');
						s.async = false;
						s.type = 'text/javascript';
						s.language = 'javascript';
						// s.src = './javascript/SS/util_TIZEN.js';
						 //20241111_twkim BRIGHT SDK , TIZEN 업데이트 해서 이제 로컬꺼 못쓴다.
						s.src = glo.URL_prefix + '../TOWERDEFENCE_COMMON/TOT/javascript/SS/util_TIZEN.js'
						document.body.appendChild(s);
						s.onload = function() //TIZEN관련 javascript파일을 로딩 완료 했다면..
						{
							//5.0에서 6.0으로 올리기 위해서 아래 코드 추가한다.
							// 5.5에서 sdk 적용 안되더라.. , 서버의 tizen 을 바꿧더니 오류가 있어서 어쩔수 없이 여기 바깥에서 처리한다.
								util_tizen.is_brd_sdk_possibele = function()
								{
									var res = 0;
									// 혹시 아래 함수를 호출하기 전에 이 함수를 호출하는 것을 방지 하는 코드임.
									if(util_tizen.tizen_ver === "0")
									{
										util_tizen.get_app_info();
										util_tizen.get_tizen_version();
									}
									// 20240904_dblee api.tizen_ver에 parseInt 추가하고 비교 값을 "5.0"을 5로 변경함  --> 6으로 바꿉니다.
									// parseInt("1.2.0") => 1  parseInt("2.3.0") => 2
									// Bright SDK는 Tizen 6.0 이상부터 지원한다. (2019년 TV 이상)

									//20250120_twkim  tizen 5.5 에서 sdk안되는 오류 있어서 6.0으로 올리도록 한다.
									if (parseInt(util_tizen.tizen_ver) >= 6 && parseInt(util_tizen.app_info.version) >= 2)
									{
										res = 1;
									}
									return res;
								}

							util_tizen.registerKey();	//20190409 - setupKeyCode 호출로 주석처리함.
							gEntrix.host_id = gEntrix.uniq_id = util_tizen.getDuid();
							util_tizen.addVisibilitychange(Main.visibilitychangeCallback);
Main.server2_enable_for_testing(); //20250719_ywlee 테스팅을 위해호출, 삭제예정
							//20241007_ywlee twkim 네트워크 단절 생겼을경우 네트워크 오류 팝업창 나오게 하기.
							// webapis.network.addNetworkStateChangeListener(util_tizen.onchange_network);

							try {
								webapis.network.addNetworkStateChangeListener(onNetworkChange);
							} catch(e) {}

							function onNetworkChange(data) 
							{
								if(data == 4)
								{
									//연결될때는 다른 처리 하지 말자.
									//alert("네트워크 연결됨");
								}
								else if(data == 5)
								{
									S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.NETWORK_ERROR,"");
									//alert("네트워크 끊어짐");
								}

								/* 
									INTERNET_CONNECTED = 0;
									LAN_CABLE_ATTACHED = 1;
									LAN_CABLE_DETACHED = 2;
									LAN_CABLE_STATE_UNKNOWN = 3;
									GATEWAY_CONNECTED = 4;
									GATEWAY_DISCONNECTED = 5;
									WIFI_MODULE_STATE_ATTACHED = 6;
									WIFI_MODULE_STATE_DETACHED = 7;
									WIFI_MODULE_STATE_UNKNOWN = 8;
									INTERNET_DISCONNECTED = 9;
								*/
							}
							Main.do_next();
						};
						s.onerror = function()
						{
						   S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.NETWORK_ERROR,"util_TIZEN.js loading faild!"); 
						}
					}
					else
					{		
						Main.get_uniq_id_test();//인자로 받아오던, local storage에서 id를 읽어 온다.
						Main.do_next();
					}
					break;
			
			//LG의 경우는 UUID등의 셋탑고유ID를 읽어 들일 수 없기 때문에 local storage를 사용 한다.
			case glo.PLATFORM.LG: 

					//history back을 위해 등록한다.
					window.addEventListener("popstate", Main.history_popstate); 


					// 202200509_dblee_LG_플랫폼 포팅하기
					var s = document.createElement('script');
					s.async = false;
					s.type = 'text/javascript';
					s.language = 'javascript';
					s.src = './javascript/LG/webOSTVjs-1.2.4/webOSTV.js';
					document.body.appendChild(s);
					
					var s = document.createElement('script');
					s.async = false;
					s.type = 'text/javascript';
					s.language = 'javascript';
					s.src = glo.URL_prefix+'../TOWERDEFENCE_COMMON/TOT/javascript/LG/util_WEBOS.js';
					document.body.appendChild(s);

					s.onload = function() //javascript파일을 로딩 완료 했다면..
					{
							//20230718_ywlee util_Webos.js파일 업그레이드(빌리언마블꺼 사용)
							if (util_fun.dbl.getDevice() == util_fun.dbl.TV)	 //TV이면
							{									
								//util_webos.setup(Main.do_next, Main.resize_fn, Main.hide_fn, Main.show_fn);
								try  
								{
									util_webos.setup(function() //빌리언 마블 하면서 util_webos.setup함수가 추가 된 것이다. 서비스 되고 있는 버전에서 바로 min해서 서비스 하면 오류 발생함.(util_webos.setup is not a function)
									{
										//local storage의 uniq_id 를 로딩하라. 없다면 server에서 uniq_id를 구해와서 set한 다음 돌아 오라.
										STORAGE.load_storage_for_LG(function()
										{
Main.server2_enable_for_testing(); //20250719_ywlee 테스팅을 위해호출, 삭제예정
												Main.do_next();
										});
									}, Main.resize_fn, Main.hide_fn, Main.show_fn);
									
								}
								catch (e)
								{
										//local storage의 uniq_id 를 로딩하라. 없다면 server에서 uniq_id를 구해와서 set한 다음 돌아 오라.
										STORAGE.load_storage_for_LG(function()
										{
Main.server2_enable_for_testing(); //20250719_ywlee 테스팅을 위해호출, 삭제예정
												Main.do_next();
										});
								}

							}
							else //TV아니면...이것은 PC,mobile 이면 이란뜻이다.
							{
									STORAGE.load_storage_for_LG(function()
									{
Main.server2_enable_for_testing(); //20250719_ywlee 테스팅을 위해호출, 삭제예정
											Main.do_next();
									});
							}

					};
					s.onerror = function()
					{
						S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.NETWORK_ERROR,"util_WEBOS.js loading faild!");
					}

					break
			case glo.PLATFORM.DLIVE:

					var s = document.createElement('script');
					s.async = false;
					s.type = 'text/javascript';
					s.language = 'javascript';
					//s.src = './javascript/HCN/cssApi.min.js';
					s.src = './javascript/DLIVE/cssApi.js'; //HCN과 cssApi.min.js파일이고, DLIVE는 cssApi.js임.
					document.body.appendChild(s);
					s.onload = function() //cssApi를 로딩한다.
					{
						var ss = document.createElement('script');
						ss.async = false;
						ss.type = 'text/javascript';
						ss.language = 'javascript';
						ss.src = './javascript/HCN/util_CNM.js'; //HCN과 DLIVE 동일인 util_CNM.js파일을 사용한다.
						document.body.appendChild(ss);
						ss.onload = function() //cssApi를 로딩한다.
						{
							if(glo.app_release == "RELEASE")
							{
								cssApi.notiOnLoad();// when App Loading completed,  cnm_dblee.1.11.2016.
													// 여기서 host_id와 cont_id를 구한후 cont_id를 uniq_id로 사용하게 한다.
													// getUserNameFromSTBAjax_DLIVE 에서 Main.do_next()를 호출 한다. 
													// 이 함수 내에는 "TEST"일 경우 예외 처리도 되어 있다.(test uniq_id : 01008365192 );
							}
							else //테스트 이면 local_storage에서 가져오게 하자.
							{		
								//하나의 컴퓨터에서 여러 id로 테스트 하기 위해 index.html?id=1111과 같은 형식으로 로그인 할 수있게 함.
								var nowAddress	= location.href;
								var parameter	= nowAddress.slice(nowAddress.indexOf('?')+1,nowAddress.length); //id=1111
								if(nowAddress.indexOf('?') == -1) //index.html에서 ?가 없다면 
								{
									STORAGE.localstorage_get_uniq_id(); //local storage에서 id를 읽어 온다
									Main.do_next(); //왜 이게 빠졌지?
								}
								else //파라미터로 id가 전달 되었다면
								{
									Main.get_uniq_id_test();//인자로 받아오던, local storage에서 id를 읽어 온다.
									Main.do_next();
								}
							}
						}
						ss.onerror = function()
						{
						   S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.NETWORK_ERROR,"util_CNM loading faild!"); 
						}
					};
					s.onerror = function()
					{
					   S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.NETWORK_ERROR,"cssApi.min.js loading faild!"); 
					}
					break;
			case glo.PLATFORM.HCN:
			case glo.PLATFORM.CJH:
					cssApi.addCsEventListener("Check", function(result)
					{
						util.log("Check Callback!!!!  :"+result);
						// TO-DO. 결제 비밀번호, 인증번호 요청 결과 수신 후 동작 로직 추가
						if (result == true || result == 'true')
						{
							CNMPaymentApi.checkUserInfoCheckAjax();
						}
						else
						{
							util_CNM_password_wrrong_error();
						}
					});
					cssApi.addCsEventListener("NotifyKey", function(keyCode)
					{
						util.log("NotifyKey Callback!!!!");
						// TO-DO. 종료키에 대한 이벤트 수신 후 동작 로직 추가
						if (keyCode == "36")
						{
							// 메뉴 키
							gEntrix.menu_key_pressed = true;
						}
						else if (keyCode == "191")
						{
							// 종료 키
							gEntrix.menu_key_pressed = false;
						}
						S_EXITPOPUP.start(glo.scene.cur+"에서 메뉴버턴 누름"); //exit popup 보여 줘라.

					});
					// cssApi.resStartApp("onload");     // “App 로딩 완료” 참조 since 2018.04.05 - CJH_B2B SO VCS 도입
					Main.onStatusInfo(cssApi.getStbInfo()); //since 2018.04.05 - CJH_B2B SO VCS 도입
					//위 함수에서 Main.do_next()함수 호출함.

					break; 
			case glo.PLATFORM.TOSS: //20251128_jhyu 토스 플랫폼 추가
			case glo.PLATFORM.ORANGE: //ORANGE 게임 향 이면
			case glo.PLATFORM.PCROOM: //PCROOM 게임 향 이면
					if(glo.app_release == "RELEASE")
					{
						Main.do_next();
					}
					else
					{
						STORAGE.localstorage_get_uniq_id(); //local storage에서 id를 읽어 온다.
						Main.do_next();
					}
					break;

			//20231014_ywlee GameHollywood 추가. GH는 여기서 id를 불러 와야 한다. 
			case glo.PLATFORM.GH: 

					var s = document.createElement('script');
					s.async			= false;
					s.type			= 'text/javascript';
					s.language	= 'javascript';
					s.src				= 'javascript/GH/util_GH.js';
					document.body.appendChild(s);
					s.onload = function() 
					{
						util_GH.login(); //로그인을 진행 하라. -- 로그인 완료하면, 바로 Main.do_next();를 실행 한다.
					};
					s.onerror = function(){S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.NETWORK_ERROR,"javascript/GH/util_GH.js loading faild!");}
					break;
			default:
					console.error("undefined glo.platform : " + glo.platform +" in Main.on_load()");
		}

		//동적 css로딩, 필요한것 여기서 로딩하자. 굳이 로딩 되지 않으면...뭐... 어쩔수 없는 것들
		if(glo.enable_guild == 1)
		{
			util.load_dynamic_css(glo.URL_prefix + '../TOWERDEFENCE_COMMON/TOT/css/add_css.css');		//입력창 애니메이션 하면서 올라오는 부분임.
		}
	};

	//20260303_jhyu 아주르 테스트 버튼
	S_SETTING.make_test_btn = function() 
	{
		if(gEntrix.uniq_id == 'TDM221948mRM' || gEntrix.uniq_id == 'TDM256474hxJ')
		{
			return true;
		}
		return false;
	}

	//20260917_dhlee 우편함 모두 받기로 만능카드 안받아지는거 수정
	S_MAILBOX.reward_all_run = function()
	{
		//보상받을 SN이 서버에 남아 있는 한번더 체크 하기   -- 효과: 네트워크단절하고 보상 받는것을 방지, 멀티로그인될 경우 한곳에만 보상 받게 하기
		PHP.check_reward_sn_all_and_del(function()
		{
			var add_ruby = 0;
			var add_gold = 0;
			var add_dia  = 0;

			//20220322_ywlee_우편함으로_만능카드수령_가능하도록하기
			var add_rainbow  = 0;

			//20230723_ywlee 길드추가
			var add_magic = 0;

			//20240116_twkim 무료티켓 추가
			var add_n_ticket = 0;
			var add_p_ticket = 0;
			
			//20231207_twkim 마일리지 추가
			var add_mileage = 0;
			var mileage_str  = "";
			
			//20250304_jhyu 로키 영혼석 우편함
			var add_soul_1 = 0;
			var soul_1_str  = "";
			//20250401_jhyu 기봉이 영혼석 우편함
			var add_soul_2 = 0;
			var soul_2_str  = "";
			//20250702_jhyu 헬나이트 영혼석 우편함
			var add_soul_3 = 0;
			var soul_3_str  = "";
			//20250702_jhyu 난천 영혼석 우편함
			var add_soul_4 = 0;
			var soul_4_str  = "";
			//20250924_jhyu 달마 영혼석 우편함
			var add_soul_5 = 0;
			var soul_5_str  = "";
			//20251112_jhyu 묵향 영혼석 우편함
			var add_soul_6 = 0;
			var soul_6_str  = "";
			//20251223_jhyu 늑대왕 영혼석 우편함
			var add_soul_7 = 0;
			var soul_7_str  = "";
			//20260306_jhyu 요르문간드 영혼석
			var add_soul_8 = 0;
			var soul_8_str  = "";
			//20260714_jhyu 태식 영혼석
			var add_soul_9 = 0;
			var soul_9_str  = "";
			//20260903_jhyu 월묘 영혼석
			var add_soul_10 = 0;
			var soul_10_str  = "";

			//20260716_dhlee 이벤트 재화
			var add_event_money = 0;

			//20260724_jhyu 길드 부적
			var add_guild_amulet = 0;

			var tower_str = "";
			var hero_str  = "";
			var item_str  = "";
			var rainbow_str  = "";//20220322_ywlee_우편함으로_만능카드수령_가능하도록하기

			//20220520_ywee_우편함으로_타워받을경우_도감업데이트안되는현상_수정
			var charbook_add = 0;
			var charbook_str = "도감추가:";

			var len = S_MAILBOX.reward_get_num();
			//저장소 문제가 없다면 이제 보상을 주자.
			for(var i=1;i<=len;i++)
			{
				switch(glo.REWARD[i].what)
				{
					case "RUBY":
								add_ruby += glo.REWARD[i].what_value;
								break;
					case "GOLD":
								add_gold += glo.REWARD[i].what_value;
								break;
					case "DIA":			
								add_dia += glo.REWARD[i].what_value;
								break;	
					case "MAGIC":			
								add_magic += glo.REWARD[i].what_value;
								break;
					//20240116_twkim 무료티켓 추가
					case "P_TICKET": //프리미엄
								add_p_ticket += glo.REWARD[i].what_value;
								break;	
					case "N_TICKET": //노말
								add_n_ticket += glo.REWARD[i].what_value;
								break;	

					case "TOWER":
								var tower_bunho_g = glo.REWARD[i].what_value;
								//tower_bunho_g의 유효성 체크 해야 하지 않나?..... 일단은 무시하자.
								S_MAKETEAM_TOWER.add_tower_to_bou(tower_bunho_g, 'add');							
								tower_str += tower_bunho_g+",";

								//20220520_ywee_우편함으로_타워받을경우_도감업데이트안되는현상_수정
								if(S_CHARBOOK.add_tower(tower_bunho_g) == 1) //새롭게 추가 되었다면
								{
									charbook_add++;
									charbook_str += tower_bunho_g+',';
								}
								break;
					case "HERO":
								var hero_bunho = glo.REWARD[i].what_value;
								if(STORAGE.hero_bou[hero_bunho].buy	== 1) //보상을로 받았지만 벌써 갖고 있었다면 무시하자.
								{
									//setTimeout(function(){util.notice("이미 갖고 있는 영웅이라 1레벨업 합니다.",3)},100); //타임 인타발을 줘서 모두받았습니다 메시지 다음에 나오게 할려고
									
									//STORAGE.hero_bou[hero_bunho].level++;
									var level	=  STORAGE.hero_bou[hero_bunho].level;
									var exp		=  STORAGE.hero_bou[hero_bunho].killexp + CAL.get_exp_for_hero_duplicate_buy();;
									S_GAME.hero_3all_exp_level(hero_bunho,exp,level);								
									
									hero_str += hero_bunho+",";
									
								}
								else
								{
									STORAGE.hero_bou[hero_bunho].buy	= 1; 
									STORAGE.hero_bou[hero_bunho].bunho	= hero_bunho;
									//STORAGE.hero_bou[hero_bunho].level	= 1;
									//STORAGE.hero_bou[hero_bunho].killexp = 0;

									//S_GAME.hero_3all_exp_level(hero_bunho,0,1);
									
									hero_str += hero_bunho+",";
								}

								//20220520_ywee_우편함으로_영웅받을경우_도감업데이트안되는현상_수정 
								STORAGE.charbook.hero[hero_bunho] = 1;

								break;
					case "ITEM":
								var item_bunho = glo.REWARD[i].what_value;
								S_MAKETEAM_ITEM.add_item_to_bou(item_bunho);//아이템 증가시키고			
								item_str += item_bunho + ",";
								break;

					//20220322_ywlee_우편함으로_만능카드수령_가능하도록하기
					case "RAINBOW": //만능카드
								add_rainbow += glo.REWARD[i].what_value;
								rainbow_str += glo.REWARD[i].why+" ";
								break;

					//20231207_twkim_우편함으로_마일리지수령_가능하도록하기
					case "MILEAGE": //마일리지
								add_mileage += glo.REWARD[i].what_value;
								mileage_str += glo.REWARD[i].why+" ";
								break;
					//20250304_jhyu 로키 영혼석 우편함
					case "SOUL_1": //영혼석
								add_soul_1 += glo.REWARD[i].what_value;
								soul_1_str += glo.REWARD[i].why+" ";
								break;
					//20250401_jhyu 기봉이 영혼석 우편함
					case "SOUL_2": //영혼석
								add_soul_2 += glo.REWARD[i].what_value;
								soul_2_str += glo.REWARD[i].why+" ";
								break;
					//20250702_jhyu 헬나이트 영혼석 우편함
					case "SOUL_3": //영혼석
								add_soul_3 += glo.REWARD[i].what_value;
								soul_3_str += glo.REWARD[i].why+" ";
								break;
					//20250702_jhyu 난천 영혼석 우편함
					case "SOUL_4": //영혼석
								add_soul_4 += glo.REWARD[i].what_value;
								soul_4_str += glo.REWARD[i].why+" ";
								break;
					//20250924_jhyu 달마 영혼석 우편함
					case "SOUL_5": //영혼석
								add_soul_5 += glo.REWARD[i].what_value;
								soul_5_str += glo.REWARD[i].why+" ";
								break;
					//20251112_jhyu 묵향 영혼석 우편함
					case "SOUL_6":
								add_soul_6 += glo.REWARD[i].what_value;
								soul_6_str += glo.REWARD[i].why+" ";
								break;
					//20251223_jhyu 늑대왕 영혼석 우편함
					case "SOUL_7":
								add_soul_7 += glo.REWARD[i].what_value;
								soul_7_str += glo.REWARD[i].why+" ";
								break;
					//20260306_jhyu 요르문간드 영혼석
					case "SOUL_8":
								add_soul_8 += glo.REWARD[i].what_value;
								soul_8_str += glo.REWARD[i].why+" ";
								break;
					//20260714_jhyu 태식 영혼석
					case "SOUL_9":
								add_soul_9 += glo.REWARD[i].what_value;
								soul_9_str += glo.REWARD[i].why+" ";
								break;
					//20260903_jhyu 월묘 영혼석
					case "SOUL_10":
								add_soul_10 += glo.REWARD[i].what_value;
								soul_10_str += glo.REWARD[i].why+" ";
								break;

					//20260716_dhlee 이벤트 재화 우편함
					case "EVENT_MONEY":
								add_event_money += glo.REWARD[i].what_value;
								break;

					//20260724_jhyu 길드 부적
					case "AMULET": 
								add_guild_amulet += glo.REWARD[i].what_value;
								break;

					default :	
								S_ERROR_POPUP.start(S_ERROR_POPUP.TYPE.PROGRAM_ERROR,"undefind reward style:"+glo.REWARD[i].what);
								console.error("보상이 정의 되지 않았습니다."+glo.REWARD[i].what);
								break;						
				}	
			} //for(i)

			//루비,골드,다이아,마력,마일리지 중에 보상이 있었다면
			if(add_ruby != 0 || add_gold != 0 || add_dia != 0 || add_magic != 0 || add_mileage != 0)
			{
				var php_obj = {
							ruby_add : add_ruby,
							ruby_why : "우편함 모두받기",
							dia_add  : add_dia,
							dia_why  : "우편함 모두받기",
							gold_add : add_gold,
							gold_why : "우편함 모두받기",
							magic_add : add_magic,
							magic_why : "우편함 모두받기",
							mileage_add : add_mileage,
							mileage_why : "우편함 모두받기",
							p_ticket_add : add_p_ticket,
							p_ticket_why : "우편함 모두받기",
							n_ticket_add : add_n_ticket,
							n_ticket_why : "우편함 모두받기",
						}
				PHP.put_userinfo_rubydiagold(php_obj,'재화획득:우편함모두받기',null);	

				//20220406_ywlee_골드만 올라가야하는데 3개다 올라가는 현상 수정
				S_MAINMENU.top_ani_check_before_call();

				//USER.ruby += add_ruby;
				CAL.set_ruby(CAL.get_ruby()+add_ruby);
				//USER.dia  += add_dia;
				CAL.set_dia(CAL.get_dia()+add_dia);
				//USER.gold += add_gold;
				CAL.set_gold(CAL.get_gold()+add_gold);

				CAL.set_magic(CAL.get_magic()+add_magic);

				CAL.set_mileage(CAL.get_mileage()+add_mileage);
				
				CAL.set_p_ticket(CAL.get_p_ticket()+add_p_ticket);
				CAL.set_n_ticket(CAL.get_n_ticket()+add_n_ticket);
				
				S_MAINMENU.top_ani_check();//S_MAINMENU.make_screen_top();//우상단 화면갱신	
			}

			//20250304_jhyu 로키 영혼석 우편함
			//20250401_jhyu 기봉이 영혼석 우편함
			//20250702_jhyu 헬나이트 영혼석 우편함
			//20250702_jhyu 난천 영혼석 우편함
			//20250924_jhyu 달마 영혼석 우편함
			//20251112_jhyu 묵향 영혼석 우편함
			//20251223_jhyu 늑대왕 영혼석 우편함
			//20260306_jhyu 요르문간드 영혼석
			//20260714_jhyu 태식 영혼석
			if (add_soul_1 != 0 || add_soul_2 != 0 || add_soul_3 != 0 || add_soul_4 != 0 || add_soul_5 != 0 
				|| add_soul_6 != 0 || add_soul_7 != 0 || add_soul_8 != 0 || add_soul_9 != 0 || add_soul_10 != 0)
			{
				// var souls_obj = {
				// 	SOUL_1 : add_soul_1,
				// 	SOUL_2 : add_soul_2,
				// 	SOUL_3 : add_soul_3,
				// 	SOUL_4 : add_soul_4,
				// 	SOUL_5 : add_soul_5,
				// 	SOUL_6 : add_soul_6,
				// 	SOUL_7 : add_soul_7,
				// 	SOUL_8 : add_soul_8,
				// 	SOUL_9 : add_soul_9,
				// 	SOUL_10 : add_soul_10,
				// }
				CAL.set_soul(CAL.get_soul("로키")+add_soul_1, "로키");
				CAL.set_soul(CAL.get_soul("기봉이")+add_soul_2, "기봉이");
				CAL.set_soul(CAL.get_soul("헬나이트")+add_soul_3, "헬나이트");
				CAL.set_soul(CAL.get_soul("난천")+add_soul_4, "난천");
				CAL.set_soul(CAL.get_soul("달마")+add_soul_5, "달마");
				CAL.set_soul(CAL.get_soul("묵향")+add_soul_6, "묵향");
				CAL.set_soul(CAL.get_soul("늑대왕")+add_soul_7, "늑대왕");
				CAL.set_soul(CAL.get_soul("뱀여왕")+add_soul_8, "뱀여왕");
				CAL.set_soul(CAL.get_soul("태식")+add_soul_9, "태식");
				CAL.set_soul(CAL.get_soul("월묘")+add_soul_10, "월묘");

				// var comment = "0,"+add_soul_1+","+add_soul_2+","+add_soul_3+","+add_soul_4+","+add_soul_5+","+add_soul_6+","+add_soul_7+","+add_soul_8+","+add_soul_9;
				// var obj = {
					// SOUL : souls_obj
				// };
				// PHP.put_myths_data("로키",["SOUL"],obj,'우편함모두받기:'+comment,null); //업데이트 해주기.
			}

			//20260716_dhlee 이벤트 재화 우편함 모두받기
			if(add_event_money != 0)
			{
				var em_all_obj = {
					USE     : 0,
					USE_WHY : '',
					ADD     : add_event_money,
					ADD_WHY : '우편함 모두받기',
					COMMENT : '우편함 EVENT_MONEY 모두받기'
				};
				PHP.getput_eventmoney(em_all_obj, null);
			}
			
			//20220322_ywlee_우편함으로_만능카드수령_가능하도록하기
			var tower_rainbow_saving = false;
			if(tower_str != "")
			{
				tower_rainbow_saving = true;
				PHP.put_userinfo_tower("타워획득:우편함모두받기:"+tower_str+":"+rainbow_str,function() 
				{
					//20220520_ywee_우편함으로_타워받을경우_도감업데이트안되는현상_수정
					if(charbook_add > 0) //도감에 추가된게 1개 이상 있다면
					{				
						S_CHARBOOK.tower_get_reward();//도감보상 줄거있으면 주고,	
						setTimeout(function(){
							PHP.put_userinfo_charbook(charbook_str); //서버에 도감 저장하라.
						},25);
					}

					if(add_rainbow > 0)
					{
						PHP.put_userinfo_tower("만능카드획득:우편함:"+add_rainbow,function()
						{
							glo.enable_key = 1;
							util.loading_hide();
							S_MAILBOX.reward_all_complete();
						});
					}
					else
					{
						glo.enable_key = 1;
						util.loading_hide();
						S_MAILBOX.reward_all_complete();
					}
				});
			}
			else if(add_rainbow > 0)
			{
				tower_rainbow_saving = true;
				PHP.put_userinfo_tower("만능카드획득:우편함:"+add_rainbow,function()
				{
					glo.enable_key = 1;
					util.loading_hide();
					S_MAILBOX.reward_all_complete();
				});
			}

			//영웅 보상이 있었다면
			if(hero_str != "")
			{
				PHP.put_userinfo_hero("영웅획득:우편함모두받기:"+hero_str,function() 
				{
					PHP.put_userinfo_charbook("우편함 모두받기 영웅수령:"+hero_str);
					glo.enable_key = 1;
					util.loading_hide();
				});
			}

			//아이템 보상이 있었다면
			if(item_str != "")
			{
				PHP.put_userinfo_item("우편함 모두받기 아이템 수령:"+item_str);
			}

			//20260724_jhyu 길드 부적
			if (add_guild_amulet > 0) 
			{
				STORAGE.guild.amulet += add_guild_amulet;
			}

			//모두 정상적인 보상을 줬다면 서버에서 모두 지워라.
			if(tower_rainbow_saving == false) S_MAILBOX.reward_all_complete();

		});
	}

//bug_fix_COMMON 끝
}



//=============이벤트 관장함수====================
//define.js에있는 S_LOGO.call_gongji()함수 에서 호출한다.
DEFINEJS_EVENT.event_manager = function()
{		
	//매월20일~22일 까지 진행하는 영웅패키지 판매 이벤트 이다.
	// DEFINEJS_EVENT.event_hero_package(); 
	
	//매월25일~27일 까지 진행하는 bundle 패키지 이벤트 이다.
	DEFINEJS_EVENT.event_bundle_package();

	//루비1+1이벤트를 시행하라. 기간설정은 함수에서
	if(DEFINEJS_EVENT.is_event("루비1+1")) 
	{
		DEFINEJS_EVENT.event_ruby_1_plus_1("루비1+1");
	} //루비1+1을 위한 함수 및 값을 변경해라
	else if(DEFINEJS_EVENT.is_event("루비n배이벤트")) 
	{
		DEFINEJS_EVENT.event_ruby_1_plus_1("루비n배이벤트");
	}

	//타워1+1이벤트를 시행하라. 기간설정은 함수에서
	//DEFINEJS_EVENT.event_tower_1_plus_1(); ==> //DEFINEJS_EVENT.is_event("타워1+1")으로 대체함.

	//일일도전 입장권무료 이벤트 진행
	DEFINEJS_EVENT.event_daytry_free(); //LG의 일일도전 무료입장을 위해 호출해야 함.	LG적용후 삭제 예정

//test HCN 쿠폰 테스트를 위해 사용 --> 실제 live될때는 이 4라인 삭제 하고 위쪽에서 실제로 glo.enable_mobile_connect값을  HCN일때 1로 set하면 됨. 20230316_ywlee
//	if(glo.platform == glo.PLATFORM.HCN && DEFINEJS_EVENT.is_HCN_qa_id(gEntrix.uniq_id) == true)
//	{
//		glo.enable_mobile_connect = 1; 
//		DEFINE.SERVICE_MAX_STAGE = 100;
//		DEFINE.for_add(); //SERVICE_MAX_STAGE를 변경했으니 여기서 한번 호출한다. 실제 검증끝난후에는 함께 주석처리 하면 됨.
//		STORAGE.init_charbook(); //실제 검증 끝난후에는 주석처리 해도 됨.
//	}

}

//매월 20일~22일까지 hero package가 운영될수 있게,DEFINE.MARKETSTORE_PACKAGE[] 배열을 set한다. 
//2022년10월 부터 정기 이벤트는 폐지함.
DEFINEJS_EVENT.event_hero_package = function()
{
	//영웅패키지 index를 찾는다.
	var len = DEFINE.MARKETSTORE_PACKAGE.length - 1;
	var index = 0;

	var i_count = 0;
	for(var i=1;i<=len;i++)
	{
		if(DEFINE.MARKETSTORE_PACKAGE[i].title == "영웅패키지")
		{
			index = i;

			// 20230920_twkim 영웅패키지 모든영웅 추석이벤트로 출시하기 위해     여기서 부터  저기 밑에까지

			/*//20221013_ywlee 정기이벤트를 수시 이벤트로 변경하면서 아래 주석처리 함.	 
				//오늘이 몇월달인가?
				var year = glo.server_time.year; //서버의 연도 (즉, 한국시간)
				var mon = glo.server_time.mon; //서버의 월 (즉, 한국시간)	  
				var mon2 = (mon < 10)? "0"+mon : mon; //두자리로 강제 맞추기
			
				//해당월에 맞게 패키지 배열을 set한다.
				DEFINE.MARKETSTORE_PACKAGE[index].due_start  = year+"/" +mon2+ "/20 00:00:00";
				DEFINE.MARKETSTORE_PACKAGE[index].due_end   = year+"/" +mon2+ "/22 23:59:59";	
			*/
				
			//---------------------------------
				//20221013_ywlee 정기이벤트를 수시 이벤트로 변경 : 1.아래 날자 변경, 2.해당영웅에 맞는 mon 설정, 
				// 3.실제 SS,LG에서 지급될 php수정(ywlee_pay_reward_from_xsolla.php 의 xsolla_ok_pay_reward_PACKAGE_hero()함수 수정)
				DEFINE.MARKETSTORE_PACKAGE[index].due_start  = "2025/02/24 00:00:00";		//영웅패키지 시작 날짜
				DEFINE.MARKETSTORE_PACKAGE[index].due_end   = "2055/02/24 23:59:59";	//20250224_jhyu 영웅패키지 상시 오픈으로 변경
				var mon = 22; //하나만 있을때, 여러개있을때는 제일 앞의 영웅


				//20230920_twkim 영웅패키지 모든영웅 추석이벤트로 출시하기 위해 mon을 바꿔줄것이다.
				//영웅패키지 원래처럼 하나만 팔면 i_count가 1에서 끝일 것이므로 상관 없다.
				//필요할때 마다 밑의 mon 값을 적절히 바꿔주고 case 추가하고빼주고 하자
				i_count++;

				switch(i_count){
					case 2: mon = 16;break;
					case 3: mon = 19;break;
					case 4: mon = 13;break;
					case 5: mon = 4;break;
					case 6: mon = 3;break;
					case 7: mon = 2;break;
					case 8: mon = 1;break;

					default : //1이나 다른 이상한 값
					break;
				}
			
				//test를 위해
				//if(glo.app_release == "TEST") DEFINE.MARKETSTORE_PACKAGE[index].due_start  = "2022/10/01 00:00:00";
			
			//-----------------------------------				
			
				//이제부터는 영웅패키지 기간이다.
				DEFINEJS_EVENT.flag.hero_package = 0;
				DEFINE.MARKETSTORE_PACKAGE[index].recommend = 1;//추천태크 활성화
				DEFINE.MARKETSTORE_PACKAGE[index].TAG = 1; //스페셜 활성화
			
			
				//해당영웅상품을 월에 맞게 set 해 준다. -- 매월 돌아가며 영웅 패키지를 판매한다.
				var url_prefix = glo.URL_prefix+"../TOWERDEFENCE_COMMON/EVENT/image/";
			
				 //20221013_ywlee 정기이벤트를 수시 이벤트로 변경하면서 아래 주석처리 함.	 
				var img_fname_package = ''; //상점에 나오는 이미지 아이콘
				var img_fname_msr = ''; //팝업창에 나오는 이미지 아이콘
			
				switch(mon)	
				{		
					case 1:	case 5:	case 9:	//로빈
						DEFINE.MARKETSTORE_PACKAGE[index].hero = [0,13,14,15];
						img_fname_package		= 'hero_package_robin'+util.get_postfix_lang()+'.png';
						img_fname_msr				= 'msr_packageicon_hero_robin.png';
						break; 
					case 2:	case 6:	case 10:  //머린
						DEFINE.MARKETSTORE_PACKAGE[index].hero = [0,10,11,12]; 
						img_fname_package		= 'hero_package_merlin'+util.get_postfix_lang()+'.png';
						img_fname_msr				= 'msr_packageicon_hero_merlin.png';
						break;			
					case 3:	 case 7:	 case 11:	//드워프
						DEFINE.MARKETSTORE_PACKAGE[index].hero = [0,7,8,9]; 
						img_fname_package		= 'hero_package_dwarf'+util.get_postfix_lang()+'.png';
						img_fname_msr				= 'msr_packageicon_hero_dwarf.png';
						break;		
					case 4:	 case 8: case 12: //드래곤
						DEFINE.MARKETSTORE_PACKAGE[index].hero = [0,4,5,6]; 
						img_fname_package		= 'hero_package_dragon_rider'+util.get_postfix_lang()+'.png';
						img_fname_msr				= 'msr_packageicon_hero_dragon_rider.png';
						break;	
					//20230727_twkim 기사단장 외 이하 다른영웅들까지 영웅패키지로 팔수있게 추가.
					case 13:	 case 14: case 15: //기사단장  
						DEFINE.MARKETSTORE_PACKAGE[index].hero = [0,16,17,18]; 
						img_fname_package		= 'hero_package_knight_captain'+util.get_postfix_lang()+'.png';
						img_fname_msr				= 'msr_packageicon_hero_knight_captain.png';
						break;	
					case 16:	 case 17: case 18: //안나
						DEFINE.MARKETSTORE_PACKAGE[index].hero = [0,19,20,21]; 
						img_fname_package		= 'hero_package_anna'+util.get_postfix_lang()+'.png';
						img_fname_msr				= 'msr_packageicon_hero_anna.png';
						break;	
					case 19:	 case 20: case 21: //로그
						DEFINE.MARKETSTORE_PACKAGE[index].hero = [0,22,23,24]; 
						img_fname_package		= 'hero_package_log'+util.get_postfix_lang()+'.png';
						img_fname_msr				= 'msr_packageicon_hero_log.png';
						break;	
					case 22:	 case 23: case 24: //엘리야
						DEFINE.MARKETSTORE_PACKAGE[index].hero = [0,25,26,27]; 
						img_fname_package		= 'hero_package_elijah'+util.get_postfix_lang()+'.png';
						img_fname_msr				= 'msr_packageicon_hero_elijah.png';
						break;	
					default:  return; //오류임.			
				}	
			
			   //이미지 파일이름 가지는 속성(package,msr) 2개 강제 생성하기
			   DEFINE.MARKETSTORE_PACKAGE[index].img_fname_package	= 	url_prefix + img_fname_package;
			   DEFINE.MARKETSTORE_PACKAGE[index].img_fname_msr			= 	url_prefix + img_fname_msr;
				
				//1.상점에 나오는 아이콘변경은 S_MARKETSTORE.make_screen_contents()에서 redefine함.
			
/* //20231214_ywlee 필요 없는 것 같아 주석 처리 함.
				//2.팝업에서 나오는 영웅아이콘 변경함.
				S_PAYMENT.get_icon_fname = function()
				{
					switch(DEFINE.MARKETSTORE_PACKAGE[S_MARKETSTORE.package_focus].title)
					{
						case "일일패키지(골드)":		return './image/marketstore/msr_packageicon_gold'+util.get_postfix_lang()+'_new.png';
						case "일일패키지(만능)":		return './image/marketstore/msr_packageicon_rainbow'+util.get_postfix_lang()+'.png';
						case "초보패키지":				return './image/marketstore/msr_packageicon_beginner'+util.get_postfix_lang()+'_new.png';
						case "아이템패키지":			return './image/marketstore/msr_packageicon_item'+util.get_postfix_lang()+'_new.png';
						case "영웅패키지":
							//20220518_ywlee_영웅패키지이벤트
							if(DEFINE.MARKETSTORE_PACKAGE[S_MARKETSTORE.package_focus].img_fname_msr == null)
								return './image/marketstore/msr_packageicon_hero'+util.get_postfix_lang()+'.png';
							else
								return DEFINE.MARKETSTORE_PACKAGE[S_MARKETSTORE.package_focus].img_fname_msr;
						case "묶음패키지":				
									if(glo.platform == glo.PLATFORM.HCN) return './image/marketstore/msr_packageicon_bundle_hcn.png';
									else								 return './image/marketstore/msr_packageicon_bundle'+util.get_postfix_lang()+'.png';
						case "월정액":				return './image/marketstore/msr_packageicon_monthly'+util.get_postfix_lang()+'.png';
						default:					return './image/marketstore/msr_packageicon1'+util.get_postfix_lang()+'.png';
					}
				}
*/
			// 20230920_twkim 영웅패키지 모든영웅 추석이벤트로 출시하기 위해 저기 위에서 부터 여기까지 라인 싹다 올렸다.
			//원래 위치는  if(index == 0) return; 밑에 있었다.

			// i = len;	//루핑을 빠져 나가라.
		}
	}
	if(index == 0) return; //뭔가 잘못된 것이다. return처리 해 버리자.
 	

	//3.메인메뉴의 상점에 Event 붙이기.
	//...
}
  
//매월 25일~27일까지 진행하는 "묶음패키지" 이벤트 이다. //20220517_ywlee
DEFINEJS_EVENT.event_bundle_package = function()
{
	//묶음패키지 index를 찾는다.
	var len = DEFINE.MARKETSTORE_PACKAGE.length - 1;
	var index = 0;
	for(var i=1;i<=len;i++)
	{
		if(DEFINE.MARKETSTORE_PACKAGE[i].title == "묶음패키지")
		{
			index = i;
			i = len;	//루핑을 빠져 나가라.
		}
	}

	if(index == 0) return; //뭔가 잘못된 것이다. return처리 해 버리자.

	var year = glo.server_time.year; //서버의 연도 (즉, 한국시간)
	var mon = glo.server_time.mon; //서버의 월 (즉, 한국시간)	  
	var mon2 = (mon < 10)? "0"+mon : mon; //두자리로 강제 맞추기

//2022년 9월 28일 이후 정기 이벤트 하지 않음. 그래서 아래 두줄 주석처리함.
	//var start = year+"/" +mon2+ "/25 00:00:00";
	//var end   = year+"/" +mon2+ "/27 23:59:59";

	//20250225_jhyu 묶음패키지 상시 오픈으로 변경, 밑에꺼 주석
	var start = "2000/01/01 00:00:00";
	var end   = "2035/01/01 23:59:59";

//정기 이벤트 이외 진행 할때 아래 주석 해제.  --- 시작 ----
	// var day = glo.server_time.day; //2월16일~2월22일

	// if( mon == 1 && 28 <= day && day <= 31 )
	// {
	// 	start = "2025/01/28 00:00:00";
	// 	end   = "2025/01/31 23:59:59"; 
	// } 

	// if( mon == 2 && 28 <= day )
	// {
	// 	start = "2025/02/28 00:00:00";
	// 	end   = "2025/03/03 23:59:59"; 
	// } 
	// if( mon == 3 && 1 <= day && day <= 3)
	// {
	// 	start = "2025/02/28 00:00:00";
	// 	end   = "2025/03/03 23:59:59";  
	// } 
//정기 이벤트 이외 진행 할때 아래 주석 해제.  --- 종료 ----

	DEFINE.MARKETSTORE_PACKAGE[index].due_start  = start;
	DEFINE.MARKETSTORE_PACKAGE[index].due_end   = end;	

	//bundle package구매 기간체크
	// var cur_timestamp = util.get_cur_timestamp();
	// if(!S_MARKETSTORE.id_due_ok_bundle_package(cur_timestamp)) 
	// {
	// 	DEFINE.MARKETSTORE_PACKAGE[index].TAG = 0; //special제거
	// 	return;
	// }

	DEFINEJS_EVENT.flag.bundle_package = 0;
	DEFINE.MARKETSTORE_PACKAGE[index].recommend = 1; //추천태그 살리자.
	DEFINE.MARKETSTORE_PACKAGE[index].TAG = 1; //스페샬 너히
	
}

//골타디 루비1+1 구현
DEFINEJS_EVENT.event_ruby_1_plus_1 = function(event_type)
{
	//20250624_jhyu 여름맞이 이벤트 추가
	//기본 루비 1+1 타이틀
	var title_ruby_11 = "루비<br>11+11개";
	var title_ruby_33 = "루비<br>33+33개";
	var title_ruby_61 = "루비<br>61+61개";
	var title_ruby_130 = "루비<br>130+130개";
	var title_ruby_230 = "루비<br>230+230개";
	var title_ruby_560 = "루비<br>560+560개";

	var xsolla_pid_11 = 1;
	var xsolla_pid_61 = 2;
	var xsolla_pid_130 = 3;
	var xsolla_pid_230 = 4;
	var xsolla_pid_560 = 9;

	var ruby_value = 2;
	
	if (event_type == '루비1+1') 
	{
		//실제 수령받을 루비의 수량을 늘려 준다.
		DEFINE.MARKETSTORE_RUBY[1].ruby *= ruby_value;
		DEFINE.MARKETSTORE_RUBY[2].ruby *= ruby_value;
		DEFINE.MARKETSTORE_RUBY[3].ruby *= ruby_value;
		DEFINE.MARKETSTORE_RUBY[4].ruby *= ruby_value;

		xsolla_pid_11 = 5;
		xsolla_pid_61 = 6;
		xsolla_pid_130 = 7;
		xsolla_pid_230 = 8;
		xsolla_pid_560 = 10;
	}
	else if (event_type == '루비n배이벤트') 
	{
		ruby_value = 5;

		title_ruby_11 = "루비<br>11 x "+ruby_value;
		title_ruby_33 = "루비<br>33 x "+ruby_value;
		title_ruby_61 = "루비<br>61 x "+ruby_value;
		title_ruby_130 = "루비<br>130 x "+ruby_value;
		title_ruby_230 = "루비<br>230 x "+ruby_value;
		title_ruby_560 = "루비<br>560 x "+ruby_value;

		//실제 수령받을 루비의 수량을 늘려 준다.
		DEFINE.MARKETSTORE_RUBY[1].ruby *= ruby_value;
		DEFINE.MARKETSTORE_RUBY[2].ruby *= ruby_value;
		DEFINE.MARKETSTORE_RUBY[3].ruby *= ruby_value;
		DEFINE.MARKETSTORE_RUBY[4].ruby *= ruby_value;

	}

	//화면표시 부분 조정 등 , 루비 1+1을 할수 있게 함수를 조작하자.
	switch(glo.platform)
	{
		case glo.PLATFORM.TOSS:  //20251128_jhyu 토스 플랫폼 추가
		case glo.PLATFORM.SKB :  //SKB의 경우 5000원 짜리 부터 있다..
		case glo.PLATFORM.ATV:
		case glo.PLATFORM.AMO:
		case glo.PLATFORM.IOS:
		case glo.PLATFORM.GH:
					DEFINE.MARKETSTORE_RUBY[1].title =  title_ruby_61;	
					DEFINE.MARKETSTORE_RUBY[2].title =  title_ruby_130;	
					DEFINE.MARKETSTORE_RUBY[3].title =  title_ruby_230;	
					DEFINE.MARKETSTORE_RUBY[4].title =  title_ruby_560;
					break;
		case glo.PLATFORM.HCN :  //HCN의 경우 1만원 넘는 상품을 만들수 없어 다른 플랫폼과 루비 판매 갯수및 가격이 다르다.
		case glo.PLATFORM.DLIVE :  //딜라이브의 경우 1만원 넘는 상품을 만들수 없어 다른 플랫폼과 루비 판매 갯수및 가격이 다르다.
					DEFINE.MARKETSTORE_RUBY[1].title =  title_ruby_11;	
					DEFINE.MARKETSTORE_RUBY[2].title =  title_ruby_33;	
					DEFINE.MARKETSTORE_RUBY[3].title =  title_ruby_61;	
					DEFINE.MARKETSTORE_RUBY[4].title =  title_ruby_130;
					break;
		case glo.PLATFORM.LG:  //20231005_twkim LG,SS 루비상품 560개짜리 추가하면서 이렇게 바꾸자.
		case glo.PLATFORM.SS:
					DEFINE.MARKETSTORE_RUBY[1].title =  title_ruby_61;	
					DEFINE.MARKETSTORE_RUBY[2].title =  title_ruby_130;	
					DEFINE.MARKETSTORE_RUBY[3].title =  title_ruby_230;	
					DEFINE.MARKETSTORE_RUBY[4].title =  title_ruby_560;
					DEFINE.MARKETSTORE_RUBY[1].XSOLLA_PID = xsolla_pid_61;
					DEFINE.MARKETSTORE_RUBY[2].XSOLLA_PID = xsolla_pid_130;
					DEFINE.MARKETSTORE_RUBY[3].XSOLLA_PID = xsolla_pid_230;
					DEFINE.MARKETSTORE_RUBY[4].XSOLLA_PID = xsolla_pid_560;  //1120개
					break;
		default:	//HCN을 제외한 모든 플랫폼은 11개(1000원),61개(5000원),130개(9000원),230개(15000원) 를 판매한다.
					DEFINE.MARKETSTORE_RUBY[1].title =  title_ruby_11;	
					DEFINE.MARKETSTORE_RUBY[2].title =  title_ruby_61;	
					DEFINE.MARKETSTORE_RUBY[3].title =  title_ruby_130;
					DEFINE.MARKETSTORE_RUBY[4].title =  title_ruby_230;
					// 20220523_dblee_루비1+1_xsolla 결제때문에 수정함.
					DEFINE.MARKETSTORE_RUBY[1].XSOLLA_PID = xsolla_pid_11;
					DEFINE.MARKETSTORE_RUBY[2].XSOLLA_PID = xsolla_pid_61;
					DEFINE.MARKETSTORE_RUBY[3].XSOLLA_PID = xsolla_pid_130;
					DEFINE.MARKETSTORE_RUBY[4].XSOLLA_PID = xsolla_pid_230;
					break;	
	}


		//PID조정 : AMO, ATV의 경우는 구글 콘솔에서 pid에 event붙은 것으로 보내면 1+1한 수량이 보인다. 20220808_ywlee	
		switch(glo.platform)
		{
			
			case glo.PLATFORM.AMO :
						DEFINE.MARKETSTORE_RUBY[1].PID = "tower_atv_ruby_2_event";
						DEFINE.MARKETSTORE_RUBY[2].PID = "tower_atv_ruby_3_event";
						DEFINE.MARKETSTORE_RUBY[3].PID = "tower_atv_ruby_4_event";
						DEFINE.MARKETSTORE_RUBY[4].PID = "tower_atv_ruby_5_event";
						break;
			case glo.PLATFORM.ATV :
						DEFINE.MARKETSTORE_RUBY[1].PID = "tower_atv_ruby_2_event";
						DEFINE.MARKETSTORE_RUBY[2].PID = "tower_atv_ruby_3_event";
						DEFINE.MARKETSTORE_RUBY[3].PID = "tower_atv_ruby_4_event";
						DEFINE.MARKETSTORE_RUBY[4].PID = "tower_atv_ruby_5_event";
						break;	
			case glo.PLATFORM.GH :
						DEFINE.MARKETSTORE_RUBY[1].PID = "tower_atv_ruby_2_event";
						DEFINE.MARKETSTORE_RUBY[2].PID = "tower_atv_ruby_3_event";
						DEFINE.MARKETSTORE_RUBY[3].PID = "tower_atv_ruby_4_event";
						DEFINE.MARKETSTORE_RUBY[4].PID = "tower_atv_ruby_5_event";
						break;	
		}


	//실제 수령받을 루비의 수량을 늘려 준다.
	// DEFINE.MARKETSTORE_RUBY[1].ruby *= 2;
	// DEFINE.MARKETSTORE_RUBY[2].ruby *= 2;
	// DEFINE.MARKETSTORE_RUBY[3].ruby *= 2;
	// DEFINE.MARKETSTORE_RUBY[4].ruby *= 2;

	//메인메뉴의 상점에 "이벤트"아이콘 넣어주기
	//DEFINEJS_EVENT.flag.ruby_1_plus_1 = 1;	 //==>DEFINEJS_EVENT.is_event("루비1+1") 로 대체함.

	DEFINE.MARKETSTORE_RUBY[1].TAG = 1; //스페셜 달아주자
	DEFINE.MARKETSTORE_RUBY[2].TAG = 1; 
	DEFINE.MARKETSTORE_RUBY[3].TAG = 1; 
	DEFINE.MARKETSTORE_RUBY[4].TAG = 1; 

	//상점안의 Ruby tab에 event icon 붙여주기	 : 1+1,묶음패키지,영웅패키지 모두 동일하기에 여기 위치 시킴
	S_MARKETSTORE.switch_contents = function()
	{
		switch(S_MARKETSTORE.tab_focus)
		{
			case 1: //패키지
					$('#MS_package').css({display:'block'});
					$('#MS_gold').css({display:'none'});
					$('#MS_dia').css({display:'none'});
					$('#MS_ruby').css({display:'none'});
					break;
			case 2: //골드
					$('#MS_package').css({display:'none'});
					$('#MS_gold').css({display:'block'});
					$('#MS_dia').css({display:'none'});
					$('#MS_ruby').css({display:'none'});
					break;
			case 3: //다이아
					$('#MS_package').css({display:'none'});
					$('#MS_gold').css({display:'none'});
					$('#MS_dia').css({display:'block'});
					$('#MS_ruby').css({display:'none'});
					break;		
			case 4: //루비
					$('#MS_package').css({display:'none'});
					$('#MS_gold').css({display:'none'});
					$('#MS_dia').css({display:'none'});
					$('#MS_ruby').css({display:'block'});
					break;
		}

		var p = document.createElement("img");
		p.style.zIndex = 10;
		p.id = "MS_tab4_event";
		document.getElementById('MS_tab4').appendChild(p);
		utilDrawImage_no_wh_pos(p.id,glo.URL_prefix+"../TOWERDEFENCE_COMMON/EVENT/image/eventicon"+util.get_postfix_lang()+".png",-25,-23);
	}

}

//일일도전 입장권 무료 이벤트 -- LG의 일일도전 입장권무료이벤트임. 20220709이후 LG업데이트 삭제 요망
DEFINEJS_EVENT.event_daytry_free = function()
{

	//매월1일~7일 정기적으로 시행 됨
	// if(1 <= glo.server_time.day && glo.server_time.day <= 7) 
	if(glo.server_time.yoil == 6 || glo.server_time.yoil == 0)
		DEFINEJS_EVENT.flag.day_try_free = 1;
	else 
		DEFINEJS_EVENT.flag.day_try_free = 0;
/*
	//2022년 6월6일 ~ 6월12일
	var start = 1654441200000; //new Date("2022/06/06 00:00:00").getTime(); //타임스탬프를 강제로 넣는 이유는 한국 시간 기준을 위함임.
	var end   = 1655045999000; //new Date("2022/06/12 23:59:59").getTime();
	var cur = parseInt(glo.timestamp_start,10) + parseInt(glo.timestamp_due,10);	
	if( start <= cur && cur <= end )
	{
		DEFINEJS_EVENT.flag.day_try_free = 1;
	}
*/
}

//20220709_ywlee_타워설치비용10%할인
//20220709_ywlee_타워설치비용10%할인
DEFINEJS_EVENT.is_event = function(event_str)
{
	var cur = parseInt(glo.timestamp_start,10) + parseInt(glo.timestamp_due,10);	
	switch(event_str)
	{		
		//20260206_dhlee 4주년 이벤트 예외처리 (2026/2/13 ~ 2026/4/15)
		case "4주년이벤트" :
				///////////////////////////////////////////////////////////////////
				///////////////////////////////////////////////////////////////////
				var start = 1770303600000; // 테스트, 2026년 2월 6일 00:00:00 (KST)
				///////////////////////////////////////////////////////////////////
				///////////////////////////////////////////////////////////////////

				// var start = 1770908400000; // 2/13 실제 	
				var end   = 1776265199000; // 2026년 4월 15일 23:59:59 (KST)
				if( start <= cur && cur <= end ) return true;
				else return false;
				break;	   
		//LG이외의 플랫홈 : ATV,AMO,KT,SKB는 여기에 해당할 것임. -- LG는 20220709 이후의 업데이트가 있을대 적용
				
		//----------- 매월 정기 event-----------------------							
		case "미션3배" : //미션 업 이벤트, (정액일 경우는 6배가 됨) //2023년2월 부터 정기 이벤트 매월1일 ~ 6일
				return false;	//20250210_jhyu 미션 개편 업데이트로 이벤트 안함
				// if(1 <= glo.server_time.day && glo.server_time.day <= 6) return true;
				// else return false;
				break;
		case "일일도전_입장권무료" : 	   //흠..LG때문에 2군데 지정해야 함. !!!!!  DEFINEJS_EVENT.event_daytry_free() 함수에도 기간설정 함게 해 주야 함.				
		case "지원병UP" :  //지원병을 황금맨으로 주는 이벤트	
				var start = 1775660400000; //new Date("2026/04/09 00:00:00").getTime(); //타임스탬프를 강제로 넣는 이유는 한국 시간 기준을 위함임.
				var end   = 1776610799000; //new Date("2026/04/19 23:59:59").getTime();
				if( start <= cur && cur <= end )  
				{
					glo.event_exp_and_stagegold_rate = 4;
					return true;
				}
				else
				{
					return false;
				}
				break;
		case "사용자경험치2배" : 	  //20231011_twkim
		case "스테이지클리어_골드2배" : 
				return false;
				break;
		// case "PVP무료입장" : //20250210_jhyu pvp 개편 업데이트로 이벤트 안함
		case "증명의탑_무료입장" :
		case "핵폭탄_50%할인" :
		case "이어서하기_50%_할인" ://핵폭탄50%할인과 함께 진행
				//if(glo.app_release == "TEST") return true;

				var start = 1776610800000; //new Date("2026/04/20 00:00:00").getTime() //타임스탬프를 강제로 넣는 이유는 한국 시간 기준을 위함임.
				var end   = 1777561199000; //new Date("2026/04/30 23:59:59").getTime();
				if( start <= cur && cur <= end )  
				{
					glo.event_exp_and_stagegold_rate = 4;
					return true;
				}
				else
				{
					return false;
				}

				//2023년12월1일 부터 매주 토, 일 진행
				// if(glo.server_time.yoil == 5 || glo.server_time.yoil == 6 || glo.server_time.yoil == 0) return true;
				//0,1,2,3,4,5,6 / 일,월,화,수,목,금,토
				// else return false;
				break; 
		case "무료뽑기_시간단축" : //11시간 --> 1시간		//매월14일 ~ 19일(지원병UP과 함께 하는 이벤트)	
				return false;
				break;

				if(14 <= glo.server_time.day && glo.server_time.day <= 19) return true;
				else return false; 
				break; 
		case "타워설치비용_10%_할인" : //매월 20~25일 (골드2배 이벤트와 함께 진행)
				return false;
				break;

				if(20 <= glo.server_time.day && glo.server_time.day <= 25) return true;
				else return false; 
				break;  	
		//-----------요기까지 매월 정기 event-----------------------

		//-----------비 정기 이벤트 -----------------------------------

		//20250609_jhyu 6월은 30일까지!!!, 이후에 삭제
		case "루비1+1" :
				// if(glo.app_release == "TEST") return true;
				var start = 1776178800000; //new Date("2026/04/15 00:00:00").getTime(); //타임스탬프를 강제로 넣는 이유는 한국 시간 기준을 위함임.
				var end   = 1780239599000; //new Date("2026/05/31 23:59:59").getTime();
		// 		var start2 = 1750435200000; //new Date("2025/06/21 00:00:00").getTime();
		// 		var end2   = 1751554799000; //new Date("2025/07/04 23:59:59").getTime();

				if( start <= cur && cur <= end )  return true; 
		// 		else if( start2 <= cur && cur <= end2 )  return true; 
		// 		else return false;
				// if(21 <= glo.server_time.day && glo.server_time.day <= 30) return true;
				// else return false; 

				//7, 8월 안함
				return false;
				break; 

		//실제 지급은 php에서 되기에 put_userinfo_gacha php에서 이벤트 날짜 수정해야한다.
		case "타워1+1" :
		// case "타워진화이벤트" :
				var start = 1777820400000; //new Date("2026/5/4 00:00:00").getTime(); //타임스탬프를 강제로 넣는 이유는 한국 시간 기준을 위함임.
				var end   = 1780239599000; //new Date("2026/5/31 23:59:59").getTime();
				if( start <= cur && cur <= end )  
					return true;
				else 
					return false;

				// // 이번달의 21일 +14일 후까지의 타임스탬프
				// var startDate = new Date(glo.server_time.year, glo.server_time.mon - 1, 21).getTime();
				// var endDate = new Date(glo.server_time.year, glo.server_time.mon - 1, 21 + 14).getTime();
				
				// // 지난달의 21일 +14일 후까지의 타임스탬프
				// var prevMonth = glo.server_time.mon - 2;	//저번달
				// var prevYear = glo.server_time.year;
				// if (prevMonth < 0) 							//0보다 작다 = 작년이다, 
				// {											//예) 이번달 1월은 glo.server_time.mon - 2하면 -1이 나옴
				//     prevMonth += 12;						//그러면 지난달은 12월로 계산
				//     prevYear -= 1;							//지난달 연도도 1년전으로 계산
				// }
				// var startDate2 = new Date(prevYear, prevMonth, 21).getTime();
				// var endDate2 = new Date(prevYear, prevMonth, 21 + 14).getTime();
				
				// // 두 기간 중 하나라도 포함되면 true
				// if ((startDate <= cur && cur <= endDate) || (startDate2 <= cur && cur <= endDate2))
				// {
				//     return true;
				// }
				// else
				// {
				// 	return false;	
				// }
				
				break;

		case "마일리지2배" :  //2개월 마다 20일에 진행
				return false;
				break;
				//if(glo.app_release == "TEST") return true;

				//2023년 10월20일 ~ 10월28일
				// var start = 1697727600000; //new Date("2023/10/20 00:00:00").getTime(); //타임스탬프를 강제로 넣는 이유는 한국 시간 기준을 위함임.
				// var end   = 1698505199000; //new Date("2023/10/28 23:59:59").getTime();
				// if( start <= cur && cur <= end )  return true; else return false;

				//정기 느낌으로 바꿈
				if(glo.server_time.mon % 2 == 0)
				{
					if(20 <= glo.server_time.day && glo.server_time.day <= 28) return true;
					else return false; 
				}
				else return false; 
				break;

		//20230423_ywlee 성장이벤트 (1~100stage까지 easy 초기 하트2배,미네랄2배)
		case "성장이벤트" :  //1~100stage까지 easy mode(하트 2배, 미네랄 2배)
				//if(glo.app_release == "TEST") return true;
				
				//20251024_jhyu 2025-12-31까지 이벤트 계속 오픈
				var start = 1775660400000; //new Date("2026/04/09 00:00:00").getTime(); //타임스탬프를 강제로 넣는 이유는 한국 시간 기준을 위함임.
				var end   = 1777561199000; //new Date("2026/04/30 23:59:59").getTime();
				if( start <= cur && cur <= end )  
				{
					glo.event_growth_rate = 2;
					return true;
				}
				else
				{
					return false;	
				}
				break;
		case "길드보스_입장무료이벤트" :   //DEFINEJS_EVENT.is_event
				var start = 1717945200000; //new Date("2024/06/10 00:00:00").getTime();
				var end   = 1718549999000; //new Date("2024/06/16 23:59:59").getTime();
				if( start <= cur && cur <= end )  return true;

				return false;
				break;
		//굴베이그 마력
		case "마력패키지_마력20%_추가지급" :   //DEFINEJS_EVENT.is_event
		// ★★---------------------------------------------------------------------------------★★
		// ★★  
		// ★★ 이거 수정할때 payment / ywlee_pay_reward_from_xsolla.php  같이 수정 해야한다!!!!!!★★
		// ★★  xsolla_ok_pay_reward_PACKAGE_magic() <<< 반드시 요안에 날짜 바꿔야함!!!
		// ★★ GH도 같이 해야된다!
		// ★★---------------------------------------------------------------------------------★★

				// var start = 1720537200000; //new Date("2024/07/10 00:00:00").getTime();
				// var end   = 1721141999000; //new Date("2024/07/16 23:59:59").getTime();
				// if( start <= cur && cur <= end )  return true;



				// //if(glo.app_release == "TEST") return true; //for test
				//정기 느낌으로 바꿈
				// if(10 <= glo.server_time.day && glo.server_time.day <= 16) return true;
				// else return false; 

				//11,12월 안함
				return false;
				break;

		//20250624_jhyu 여름맞이 이벤트 추가
		//ywlee_pay_reward_from_xsolla.php > xsolla_ok_pay_reward_PACKAGE_magic(), xsolla_ok_pay_reward_RUBY()에도 날짜 수정
		case "마력n배이벤트" :
		case "루비n배이벤트" :
				// return false;
				// break;
				var start = 1769007600000; //new Date("2026/01/22 00:00:00").getTime();  //타임스탬프를 강제로 넣는 이유는 한국 시간 기준을 위함임.
				var end   = 1771945199000; //new Date("2026/02/24 23:59:59").getTime();

				// if(glo.app_release == "TEST") return true;

				if( start <= cur && cur <= end )  return true;
				else return false;
				break;

		/*----------------------------------------------------------------
		* 출석부 이벤트 및 스페셜 이벤트메뉴 관리에 관한 설명 20240201_twkim 최신 :

			출석부 이벤트 등, 이벤트메뉴 내부에서 열릴 모든 이벤트중 하나라도 있을때는 같이 열어줘야 한다.
			glo.attendance_event_image_url 을 설정 해준다. 다른 이벤트 없이 출석부 단독으로 할때는 normal.
			이는 image - attendance_event ,eventmenu, eventmenu_gacha , eventmenu_shop , eventmenu_stage, eventstage_result 폴더 안에있는 
			각각의 폴더를 가리킨다.
			
			출석부이벤트 준비 방법 :
				해당 DB의 초기화 ( TOWERDEFENCE_COMMON.ATTENDANCE_EVENT)
				해당 PHP에서 보상수정 ( TOWERDEFENCE_COMMON.ATTENDANCE_EVENT.getput_attendance_event_status_AES.php ) 
				--- 골타디 할리우드 본서버 ,할리우드 테스트서버 까지 같이 해야함.
				이때 할리우드와 우리 한국서버의 php가 살~짝 다르므로 무지성 복붙은 금지! ( ex : date 날짜 )
			
			이벤트메뉴 준비 방법 : 
				모든 이벤트가 다 없다면 닫아주면 되고, 이게 닫혀있으면 이벤트메뉴의 모든 이벤트 동작 안한다.
				이게 열려있어도, 내부의 다른 이벤트(스테이지,뽑기,상점)의 시간은 별개로 동작한다.
				그러니 case "이벤트메뉴" , case "출석부이벤트" , case "이벤트스테이지뽑기상점" 모두 시간 설정 의도한대로 해주어야 한다.

				crontap 하루마다 돌게 해둔것 eventmenu_cron_daily.php 찾아들어가서 날짜 지정해주기
				-- 이 크론탭 돌면서 재화량 이상하면 블락처리 되는 기믹 있으므로 테스트 하면서 이리저리 설정해주고 하고 나서 만약 블락되었다면 이게 원인임--
				
				DB 초기화 ( TOWERDEFENCE_COMMON.EVENT_GACHA,MONEY,SHOP,STAGE,ACC까지 싹다 비우기)
				GACHA 뽑기 보상 수정 ( TOWERDEFENCE_COMMON.EVENT_MENU.gacha_event_100.php , eventmenu_gacha.php )

				어떤 이벤트를 하냐에 따라 (ex : 크리스마스 , 설날 ) 이미지 및 텍스트 등이 바뀔것이기 때문에,
				glo.attendance_event_image_url 값을 바꿔준다. 
				추가 한다면, 값을 새로 설정해주고 그 이름대로 폴더를 만들어서 그 안에 필요한 이미지를 넣는다.
				살짝의 코드 수정이 필요할 수 있고, TOWERDEFENCE_COMMON.EVENT_MENU/ ... 안의 php 에서 여러 값들을 수정해야 할 수도 있다.
				디자인팀에서 최대한 맞춰 주겠지만, 이벤트 이름 같은 title이라던가, 재화명 변경, 글 색깔 변경 등등이 필요하다.

				--- 골타디 할리우드 본서버 ,할리우드 테스트서버 까지 같이 해야함.
				이때 할리우드와 우리 한국서버의 php가 살~짝 다르므로 무지성 복붙은 금지! ( ex : date 날짜 )
			
			이벤트스테이지뽑기상점 :
				이것이 활성화 되어있지 않은것이 출석부이벤트만 있을 때이다.
				이때에는 이벤트 재화 등 관련한 것이 동작 안한다.
				이벤트 메뉴는 오로지 출석부 이벤트를 들어가기 위한 입장맵일 뿐이다.
				lock 이미지와 함께 , 메뉴를 눌러도 들어가지 못하도록 설계 해 두었다.
				lock 이미지를 할때는 eventmenu.php 에서 menu2,3,4의 글 색깔을 회색으로 바꿔주도록 하자.

				새로운 이벤트가 생겼다면 (크리스마스,설날 말고) eventstage_util.js 에 case 추가해서 path 넣어주자.
				S_GAME.path_load.js  S_GAME.path_load() 함수에 맵이 이벤트던전일때 case 추가해준다. 
				path_map_eventstage~~.js는 기획자에게 받아서 서버의 TOT/javascript/path_data/ 에다가 집어넣자.
				game 맵 jpg도 map_eventstage_이벤트이름.jpg  해서 TOT/image/game/map/ 에다가 넣어주자.

		----------------------------------------------------------------*/		
		case "이벤트메뉴" : 
				//if(glo.app_release == "TEST") return true;
				// var start = 1777561200000; //new Date("2026/05/01 00:00:00").getTime(); //타임스탬프를 강제로 넣는 이유는 한국 시간 기준을 위함임.
				var start = 1789311600000; //new Date("2026/09/14 00:00:00").getTime();
				var end   = 1791989999000; //new Date("2026/10/14 23:59:59").getTime();


				// glo.attendance_event_image_url =  "seollal";
				// glo.attendance_event_image_url =  "christmas";
				 // glo.attendance_event_image_url =  "winter";
				// glo.attendance_event_image_url =  "family"; //
				// glo.attendance_event_image_url =  "normal"; //  <<-출석부 단독이벤트일때
				// glo.attendance_event_image_url =  "summer"; // 
				glo.attendance_event_image_url =  "chuseok";
				// glo.attendance_event_image_url =  "3rdAnniv";

				glo.eventmenu_endtime = end; //이걸로 php에서 시간 보내주던 역할 대신함
				if( start <= cur && cur <= end )  return true; else return false;
				break;

		case "출석부이벤트" : 
		// if(glo.app_release == "TEST") return true;
				// var start = 1777561200000; //new Date("2026/05/01 00:00:00").getTime(); //타임스탬프를 강제로 넣는 이유는 한국 시간 기준을 위함임.
				var start = 1789311600000; //new Date("2026/09/14 00:00:00").getTime();
				var end   = 1791989999000; //new Date("2026/10/14 23:59:59").getTime();

				glo.eventmenu_attendance_endtime = end;  //이걸로 php에서 시간 보내주던 역할 대신함
				if( start <= cur && cur <= end )  return true; else return false;

		case "이벤트스테이지뽑기상점" :  //이벤트 스테이지, 뽑기, 상점 를 한번에 관리한다. 
		// glo.attendance_event_image_url 가 normal 이 아니어야 한다!!.

		//이게 활성화 안되어있으면 이벤트 재화는 0이고 얻거나 쓸 수 없다.
				//if(glo.app_release == "TEST") return true;
				// var start = 1758589200000; //new Date("2025/09/23 10:00:00").getTime();  //타임스탬프를 강제로 넣는 이유는 한국 시간 기준을 위함임.
				// var start = 1777561200000; //new Date("2026/05/01 00:00:00").getTime(); //타임스탬프를 강제로 넣는 이유는 한국 시간 기준을 위함임.
				var start = 1789311600000; //new Date("2026/09/14 00:00:00").getTime();
				var end   = 1791989999000; //new Date("2026/10/14 23:59:59").getTime();

				glo.eventmenu_sgs_endtime = end; //이걸로 php에서 시간 보내주던 역할 대신함
				if( start <= cur && cur <= end )  return true; else return false;
				break;
		case "신화영웅특별미션" :  //신화영웅 특별미션 (신화영웅 변경 가능)

		//이게 활성화 안되어있으면 특별미션 못 한다.
				// if(glo.app_release == "TEST") return false;
				var start = 1789311600000; //new Date("2026/09/14 00:00:00").getTime();
				var end   = 1791989999000; //new Date("2026/10/14 23:59:59").getTime();

				// glo.myths_quest_hero_name = 'gibong'; //S_MYTHS의 hero_name에 있는 값이어야 한다.
				glo.myths_quest_hero_name = 'chuseok'; //스페셜 미션판 이미지 폴더명
				glo.myths_quest_mission_key = 'chuseok_2026';

				glo.myths_quest_endtime = end; //이걸로 php에서 시간 보내주던 역할 대신함
				if( start <= cur && cur <= end )  return true; else return false;
				break;


		default: return false;	

	}
	return false; //혹시모를 예외처리임.
}


//20230901_ywlee 자체 CDN구축을 위해 사용함.--시작-----------------------------
// .... history삭제함. define_backup_20260602.js 참고바람.
// var gLIVE_MIN = "GTD.min_20260407_1500.js";								//상점 개편, 타워 해킹 방어 추가
// var gLIVE_MIN = "GTD.min_20260408_1100.js";								//주간 보상 개편, 보스전 보상 개편
// var gLIVE_MIN = "GTD.min_20260408_1730.js";								//출석부 보상 개편
// var gLIVE_MIN = "GTD.min_20260409_1430.js";								//증명의 탑 개편
// var gLIVE_MIN = "GTD.min_20260410_1040.js";								//신규사용자 재화 수정
// var gLIVE_MIN = "GTD.min_20260413_1145.js";								//뱀여왕,패키지,영혼석 뽑기
// var gLIVE_MIN = "GTD.min_20260414_1800.js";								//제한된 pvp 모드 추가
// var gLIVE_MIN = "GTD.min_20260415_1130.js";								//오류 수정
// var gLIVE_MIN = "GTD.min_20260420_1000.js";								//pvp 패널티 제거
// var gLIVE_MIN = "GTD.min_20260420_1400.js";								//스테이지 난이도 조정, 길드 전장 주간 보상 변경, pvp 랭킹전, 보스전 점수 달성 보상 수정
// var gLIVE_MIN = "GTD.min_20260421_1400.js";								//스페셜 이벤트, 순신 빙결 무효
// var gLIVE_MIN = "GTD.min_20260422_1045.js";								//가정의 달 마일리지,랜덤 전설타워 1종 패키지
// var gLIVE_MIN = "GTD.min_20260422_1725.js";								//가정의 달 영혼석 패키지 6개 추가
// var gLIVE_MIN = "GTD.min_20260427_1200.js";								//증명의 탑 수정
// var gLIVE_MIN = "GTD.min_20260428_1800.js";								//타워 해킹 방어 추가
// var gLIVE_MIN = "GTD.min_20260430_1000.js";								//타워 선택 10개로 확장
// var gLIVE_MIN = "GTD.min_20260506_1030.js";								//타워 1+1 추가, 루비, 마력 미니 패키지 추가, 영웅 해킹 방어 추가
// var gLIVE_MIN = "GTD.min_20260519_1030.js";								//신화+ 난초 타워, 유닛 추가, 길드 보스 개편
// var gLIVE_MIN = "GTD.min_20260520_1030.js";								//이무기 얼음 안먹히는거 수정;
// var gLIVE_MIN = "GTD.min_20260521_1430.js";								//길드 보스 오류 수정
// var gLIVE_MIN = "GTD.min_20260601_1010.js";								//여름 패키지, 길드스테이지
// var gLIVE_MIN = "GTD.min_20260602_1010.js";								//오류 수정
// var gLIVE_MIN = "GTD.min_20260608_0950.js";								//길드 전장 맵 변경
// var gLIVE_MIN = "GTD.min_20260608_1450.js";								//오류 수정
// var gLIVE_MIN = "GTD.min_20260609_1010.js";								//로키, 헬나이트 개편
// var gLIVE_MIN = "GTD.min_20260610_0950.js";								//이벤트 출석부 포커스 추가
// var gLIVE_MIN = "GTD.min_20260615_1630.js";								//오류 수정
// var gLIVE_MIN = "GTD.min_20260618_1000.js";								//공격 on/off 기능, 영웅 선택 10개 확장
// var gLIVE_MIN = "GTD.min_20260619_1200.js";								//오류 수정
// var gLIVE_MIN = "GTD.min_20260624_1000.js";								//로키 스페셜 상품
// var gLIVE_MIN = "GTD.min_20260629_1000.js";								//신규 스테이지, 패키지
// var gLIVE_MIN = "GTD.min_20260701_1010.js";								//스페셜 이벤트 수정, 여름 패키지 추가, 영웅 타워 공격 온오프 수정
// var gLIVE_MIN = "GTD.min_20260702_0950.js";								//신화 박쥐 타워 추가
// var gLIVE_MIN = "GTD.min_20260708_0950.js";								//길드 스테이지 버프 재선택권, 첫 구매 연계 상품 추가 
// var gLIVE_MIN = "GTD.min_20260713_1430.js";								//다른 게임 더보기 추가
// var gLIVE_MIN = "GTD.min_20260715_1030.js";								//신화+ 국화 타워, 유닛 추가
// var gLIVE_MIN = "GTD.min_20260716_1830.js";								//enemydefine 수정
// var gLIVE_MIN = "GTD.min_20260723_1000.js";								//까마귀 타워, 태식 영웅, 관련 상품 추가
// var gLIVE_MIN = "GTD.min_20260724_1100.js";								//길드 스테이지 define 업데이트
// var gLIVE_MIN = "GTD.min_20260803_1000.js";								//스페셜 이벤트 개편
// var gLIVE_MIN = "GTD.min_20260803_1500.js";								//pvp define 수정
// var gLIVE_MIN = "GTD.min_20260803_1645.js";								//이벤트 뽑기 팝업 문구 추가
// var gLIVE_MIN = "GTD.min_20260807_1200.js";								//다른 게임 더보기 - 에어포스,오더업카페,황금의길 추가, 오류 수정
// var gLIVE_MIN = "GTD.min_20260810_1840.js";								//길드 해킹 관련 추방, 탈퇴 등 수정
// var gLIVE_MIN = "GTD.min_20260811_1230.js";								//버프재선택권 추가 기능, 매난국죽 영웅 레벨 확장
// var gLIVE_MIN = "GTD.min_20260811_1540.js";								//버프재선택권 추가 기능, 매난국죽 영웅 레벨 확장
// var gLIVE_MIN = "GTD.min_20260811_1910.js";								//버프재선택권 추가 기능, 매난국죽 영웅 레벨 확장
// var gLIVE_MIN = "GTD.min_20260813_1040.js";								//매난국죽 pvp 추가 점수 수정?, 도감 업데이트
// var gLIVE_MIN = "GTD.min_20260814_1610.js";								//매화무사, 마교 주술사 유닛 기능 추가, 도감 업데이트, 도감 업데이트때매 min파일 ㅈㄴ 늘어남
// var gLIVE_MIN = "GTD.min_20260818_1955.js";								//pvp,보스전 점수달성 보상,주간보상,시즌보상 변경
// var gLIVE_MIN = "GTD.min_20260820_1430.js";								//스페셜 상품 리스트 추가
// var gLIVE_MIN = "GTD.min_20260824_1545.js";								//길드 생성 해킹 방어 및 재화 변경, 길드 컨텐츠 제한 시간 통일
// var gLIVE_MIN = "GTD.min_20260907_1000.js";								//길드 영지전, 관련 상품 추가, 신화+ 대나무타워, 신화 유닛 우치 추가
// var gLIVE_MIN = "GTD.min_20260907_1600.js";								//오류 수정
// var gLIVE_MIN = "GTD.min_20260908_1200.js";								//오류 수정
// var gLIVE_MIN = "GTD.min_20260911_1600.js";								//오류 수정
// var gLIVE_MIN = "GTD.min_20260914_1120.js";								//영웅 월묘 추가, 광고 메뉴 추가, 특별 미션 추가 등 
// var gLIVE_MIN = "GTD.min_20260914_1220.js";								//오류 수정
// var gLIVE_MIN = "GTD.min_20260915_1600.js";								//오류 수정
// var gLIVE_MIN = "GTD.min_20260916_1400.js";								//오류 수정
var gLIVE_MIN = "GTD.min_20260918_1730.js";								//밸런스 패치


// guild_season_period 도 바꿔주기




var CDN = //CDN.server_list[CDN.SERVER_INDEX].path_url
{
	SERVER_INDEX : 0,//가장 먼저 ping 응답오는 서버의 번지값(1~2)의 값이 set된다.
	response_time : 0, //측정된 ping값 즉 ms값이 여기 들어감.
	server_list :
						[	{},
							{  //202403226_ywlee 서버과부하로 한국 서버를 8093 에서 8094로 변경함.
								server_name	: "한국서버", 
								ping_url		: "http://211.253.26.47:8093/ping.php", //DLIVE를 위해 93으로 남겨둠
								min_src			: "http://211.253.26.47:8094/TOWERDEFENCE_COMMON/min/"+gLIVE_MIN,		
								aes_url			: "http://211.253.26.47:8093/TOWERDEFENCE_COMMON/CRYPTO/aes.js", //요놈도 8093으로 해야 한다
								img_url			: "http://211.253.26.47:8094/TOWERDEFENCE_COMMON/TOT/", //image가 있는 디렉토리
								path_url		: "http://211.253.26.47:8094/TOWERDEFENCE_COMMON/TOT/javascript/path_data/",
								pvp_url			: "ws://14.49.36.116",
								sound_url		: "http://211.253.26.47:8094/TOWERDEFENCE_COMMON/TOT/sound/", //sound,
							},
							{
								server_name	: "독일2서버", //ultahost 월3만원, traffice 무제한
								ping_url		: "http://79.133.51.198/busidol_traffic/ping.php",
								min_src			: "http://79.133.51.198/busidol_traffic/GTD/min/"+gLIVE_MIN,								
								aes_url			: "http://79.133.51.198/busidol_traffic/GTD/CRYPTO/aes.js",
								img_url			: "http://79.133.51.198/busidol_traffic/GTD/TOT/",//image가 있는 디렉토리
								path_url		: "http://79.133.51.198/busidol_traffic/GTD/TOT/javascript/path_data/",
								pvp_url			: "ws://79.133.51.198",
								sound_url		: "http://79.133.51.198/busidol_traffic/GTD/TOT/sound/", //sound
							},
							{
								server_name	: "베트남서버",  //(GlobalHost)
								ping_url		: "http://103.143.208.187/busidol_traffic/ping.php",
								min_src			: "http://103.143.208.187/busidol_traffic/GTD/min/"+gLIVE_MIN,								
								aes_url			: "http://103.143.208.187/busidol_traffic/GTD/CRYPTO/aes.js",
								img_url			: "http://103.143.208.187/busidol_traffic/GTD/TOT/",//image가 있는 디렉토리
								path_url		: "http://103.143.208.187/busidol_traffic/GTD/TOT/javascript/path_data/",
								pvp_url			: "ws://103.143.208.187",
								sound_url		: "http://103.143.208.187/busidol_traffic/GTD/TOT/sound/", //sound
							},
							{
								server_name	: "미국서버(뉴욕)", //ultahost 월3만원, traffice 무제한
								ping_url		: "http://45.42.40.173/busidol_traffic/ping.php",
								min_src			: "http://45.42.40.173/busidol_traffic/GTD/min/"+gLIVE_MIN,								
								aes_url			: "http://45.42.40.173/busidol_traffic/GTD/CRYPTO/aes.js",
								img_url			: "http://45.42.40.173/busidol_traffic/GTD/TOT/",//image가 있는 디렉토리
								path_url		: "http://45.42.40.173/busidol_traffic/GTD/TOT/javascript/path_data/",
								pvp_url			: "ws://45.42.40.173",
								sound_url		: "http://45.42.40.173/busidol_traffic/GTD/TOT/sound/", //sound
							},

							
						],
}

//server 수만큼 ping을 생성한다.
CDN.ping1 = function()
{
	var index = 1; var startTime = new Date().getTime();// 서버 응답 시간 측정 시작
	var xhr = new XMLHttpRequest();// XMLHttpRequest 생성
	xhr.open("GET", CDN.server_list[index].ping_url, true);// 서버로 요청 보내기
	xhr.onreadystatechange = function () 
	{ if (xhr.readyState == 4) // 응답이 완료되었을 때
		{	var endTime = new Date().getTime();// 응답 시간 측정 종료   
			var responseTime = endTime - startTime; // 응답 시간 계산			
			if (xhr.status == 200) // 응답이 정상적이면
			{	//console.log(CDN.server_list[index].server_name + "서버 응답 시간: " + responseTime + "ms");
				if(CDN.SERVER_INDEX == 0) {CDN.SERVER_INDEX = 1;CDN.response_time=responseTime} //이 서버가 가장 빠르다 표시하기.
			} else {
				//console.log(CDN.server_list[index].server_name +"서버 응답 에러");
			}}};
	xhr.send();
}
CDN.ping2 = function()
{
	var index = 2; var startTime = new Date().getTime();var xhr = new XMLHttpRequest();
	xhr.open("GET", CDN.server_list[index].ping_url, true);
	xhr.onreadystatechange = function () 
	{  if (xhr.readyState == 4)
		{	var endTime = new Date().getTime(); 
			var responseTime = endTime - startTime;			
			if (xhr.status == 200)
			{	//console.log(CDN.server_list[index].server_name + "서버 응답 시간: " + responseTime + "ms");
				if(CDN.SERVER_INDEX == 0) {CDN.SERVER_INDEX = 2;CDN.response_time=responseTime}; //이 서버가 가장 빠르다 표시하기.
			} else 
			{	//console.log(CDN.server_list[index].server_name +"서버 응답 에러");
			}}};
	xhr.send();
}
CDN.ping3 = function()
{
	var index = 3; var startTime = new Date().getTime();var xhr = new XMLHttpRequest();
	xhr.open("GET", CDN.server_list[index].ping_url, true);
	xhr.onreadystatechange = function () 
	{  if (xhr.readyState == 4)
		{	var endTime = new Date().getTime(); 
			var responseTime = endTime - startTime;			
			if (xhr.status == 200)
			{	//console.log(CDN.server_list[index].server_name + "서버 응답 시간: " + responseTime + "ms");
				if(CDN.SERVER_INDEX == 0) {CDN.SERVER_INDEX = 3;CDN.response_time=responseTime}; //이 서버가 가장 빠르다 표시하기.
			} else 
			{	//console.log(CDN.server_list[index].server_name +"서버 응답 에러");
			}}};
	xhr.send();
}
CDN.ping4 = function()
{
	var index = 4; var startTime = new Date().getTime();var xhr = new XMLHttpRequest();
	xhr.open("GET", CDN.server_list[index].ping_url, true);
	xhr.onreadystatechange = function () 
	{  if (xhr.readyState == 4)
		{	var endTime = new Date().getTime(); 
			var responseTime = endTime - startTime;			
			if (xhr.status == 200)
			{	//console.log(CDN.server_list[index].server_name + "서버 응답 시간: " + responseTime + "ms");
				if(CDN.SERVER_INDEX == 0) {CDN.SERVER_INDEX = 4;CDN.response_time=responseTime}; //이 서버가 가장 빠르다 표시하기.
			} else 
			{	//console.log(CDN.server_list[index].server_name +"서버 응답 에러");
			}}};
	xhr.send();
}

//20240118_ywlee 플랫폼 구분해서 핑 안날린놈 안날리게 하기 위해  DEFINE.goods()에서 호출하려 했으나 실패함. LG가 black 화면 나옴.
//핑 날려서 제일 가까운서버 index를 구해서 CDN.SERVER_INDEX에 넣어라
CDN.ping1();  //한국
CDN.ping2();  //독일 //20230911_ywlee 임시주석처리 
CDN.ping3();  //베트남서버 //20230911_ywlee 임시주석처리 
CDN.ping4();  //미국서버(뉴욕)
//20230901_ywlee 자체 CDN구축을 위해 사용함.--끝-----------------------------

//20250707_ywlee GTD서버2제작
CDN.set_serverinfo = function()
{	
	switch(glo.SERVER_NUM)
	{
		case 0: 
				console.error("server_num error in CDN.set_serverinfo()"); 
				return;
		case 1: //server #1이면  최초 부팅할때의 위의 CDN setting을 따른다.
				 return;
		case 2: //server #2이면 흠...이게 베트남 서버이다.
/* //이건 변경하지 않고, 
				CDN.SERVER_INDEX = 1;//가장 먼저 ping 응답오는 서버의 번지값(1~2)의 값이 set된다.
				CDN.server_list[1]=	
										{
											server_name	: "골타디서버#2(베트남에위치함)", 
											ping_url			: "http://103.143.208.18/ping.php",
											min_src			: "http://103.143.208.18/TOWERDEFENCE_COMMON/min/"+gLIVE_MIN,		
											aes_url				: "http://103.143.208.18/TOWERDEFENCE_COMMON/CRYPTO/aes.js",
											img_url			: "http://103.143.208.18/TOWERDEFENCE_COMMON/TOT/", //image가 있는 디렉토리
											path_url			: "http://103.143.208.18/TOWERDEFENCE_COMMON/TOT/javascript/path_data/",
											pvp_url			: "ws://103.143.208.187", //pvp서버는 우선 베트남의 pvp서버 이용해 보자
											sound_url		: "http://103.143.208.18/TOWERDEFENCE_COMMON/TOT/sound/", //sound
										};
*/		
				if(util.get_platform_for_db() == glo.PLATFORM.IOS)
					glo.URL_prefix = "https://game.busidol.com/TOWERDEFENCE_IOS_Server2/"; //이놈의 크다. ios의경우는 좀더 다르게 처리 해야 한다.
				else if(util.get_platform_for_db() == glo.PLATFORM.TOSS)
					glo.URL_prefix = "https://game.busidol.com/TOWERDEFENCE_TOSS_Server2/"; //이놈의 크다. TOSS의경우는 좀더 다르게 처리 해야 한다.
				else
					glo.URL_prefix = "http://103.143.208.18/TOWERDEFENCE_"+util.get_platform_for_db() +"/"; //이놈의 크다. ios의경우는 좀더 다르게 처리 해야 한다.


				//골타디PVP전용서버사용함. - //20231012_ywlee 각 리전별 PVP서버 생성
				//WSS.URL = CDN.server_list[CDN.SERVER_INDEX].pvp_url; --요건 최초 빵빵하게 연결된놈을 사용하기위해 여기서 주석처리 함.
				WSS.PORT = 20000;  //20000, 20001 toggle 사용

				return;		
	}
}
//서버 번호에 따른 url prefix를  리턴한다.
CDN.get_server_url_prefix = function(server_num)
{
	if(util.get_platform_for_db() == glo.PLATFORM.IOS) //IOS의 경우는 game.busidol.com에 있다.
	{
		switch(server_num)
		{
			case 1: return "https://game.busidol.com/TOWERDEFENCE_IOS/";
			case 2: return "https://game.busidol.com/TOWERDEFENCE_IOS_Server2/";
		}
	}
	else if(util.get_platform_for_db() == glo.PLATFORM.TOSS) //TOSS의 경우는 game.busidol.com에 있다.
	{
		switch(server_num)
		{
			case 1: return "https://game.busidol.com/TOWERDEFENCE_TOSS/";
			case 2: return "https://game.busidol.com/TOWERDEFENCE_TOSS_Server2/";
		}
	}
	else
	{
		switch(server_num)
		{
			case 1: return "http://211.253.26.47:8093/TOWERDEFENCE_"+glo.platform+"/";
			case 2: return "http://103.143.208.18/TOWERDEFENCE_"+glo.platform+"/";
		}
	}
}
