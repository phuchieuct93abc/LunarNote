import { StyleSheet, View, Text,Image } from "react-native";
import React from "react";
import TimeAgo from 'react-native-timeago'
const ArticleDetail = (article)=>{
extractHostname = (url)=> {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}
	let sourceIcon = "https://www.google.com/s2/favicons?domain="+extractHostname(article.article.ContentUrl)
	var timestamp = new Date(parseInt(article.article.Date));

	return (
		<View style={{flex:1,flexDirection:"row",    alignItems: "stretch",padding:10,paddingBottom:0}}> 
		<View style={{flex:1,flexDirection:"row"}}>
			<Text >{article.article.SourceName}</Text>
			<Image source={{uri: sourceIcon}}
	      		 style={{width: 20, height: 20,marginLeft:10}} />
		</View>
		<View style={{justifyContent:"flex-end"}}>
			<TimeAgo time={timestamp} />
		</View> 
	</View>
		)
}

export default  ArticleDetail 