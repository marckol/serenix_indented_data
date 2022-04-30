var territories =
    //Name	Description	Area(km2)	Population	Time Zone
    "Cameroon	Republic of Cameroon	472710	27911548	GMT+01\n"
    + "	Adamawa	Adamawa region			GMT+01\n"
    + "		Ngaoundere	Ngaoundere		231357\n"
    + "	Center	Center region\n"
    + "		Yaounde	Yaounde		1299369\n"
    + "		Bafia	Bafia		69270\n"
    + "		Mbalmayo	Mbalmayo		80206\n"
    + "	East	East region\n"
    + "		Bertoua	Bertoua		218111\n"
    + "		Batouri	Batouri		43821\n"
    + "	Far North	Far North region\n"
    + "		Maroua\n"
    + "	Littoral	Littoral region\n"
    + "		Douala	Douala city		1338082\n"
    + "		Nkongsamba	Nkongsamba\n"
    + "		Edea	Edea Town\n"
    + "		Yabassi	Yabassi\n"
    + "	North	North region\n"
    + "		Garoua\n"
    + "	North West	North West region\n"
    + "		Bamenda\n"
    + "		Kumbo		53970\n"
    + "	South	South region\n"
    + "		Ebolowa	Ebolowa\n"
    + "		Sangmelima	Sangmelima\n"
    + "	South West	South West region\n"
    + "		Buea	Buea Town\n"
    + "		Limbe	Limbe Town\n"
    + "		Kumba		144413\n"
    + "	West	West region\n"
    + "		Bafoussam	Bafoussam\n"
    + "		Bagangte	Bagangte		65385\n"
    + "United States of America	United States of America	9826675	318212000	UTC -5 to -10\n"
    + "	California	The Tech State	423970	38340000	Pacific Time\n"
    + "		San Francisco	The happening city	231	837442	PST\n"
    + "		Los Angeles	Disco city	503	3904657	PST\n"
    + "	Illinois	Not so cool	57914	12882135	Central Time Zone\n"
    + "		Chicago	Financial City	234	2695598	CST\n"
    + "	Texas	Rances, Oil & Gas	268581	26448193	Mountain\n"
    + "	New York	The largest diverse city	141300	19651127	Eastern Time Zone\n"
    + "	Manhattan	Time Square is the place	269.403	0	EST\n"
    + "	Manhattan City	Manhattan island	33.77	0	EST\n"
    + "	Time Square	Time Square for new year	269.4	0	EST\n"
    + "	Niagra water fall	Close to Canada	65.7	0	EST\n"
    + "	Long Island	Harbour to Atlantic	362.9	0	EST\n"
    + "	All_Other	All_Other demographics	0	0	0\n"
    + "India	Hydrabad tech city	9826675	318212000	IST\n"
    + "Bangladesh	Country of love	9826675	318212000	BST";
	
territories = ITextData.parse(territories, { 
	tabSpaces: 4, 
	childrenField: "territories",
	fields : ['name', 'description', ['area', 'float'], ['population', 'int'], 'timezone'],
	delim: '\t'
});
console.log(territories);