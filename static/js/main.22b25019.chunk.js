(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(19),l=a.n(s),c=a(102),o=(a(32),a(3)),i=a(4),m=a(6),u=a(5),d=a(7),p=(a(55),a(20)),h=a(8),g=a.n(h),v=a(15),f=a(49),b=a(11),E=a(13),N=a.n(E),y=a(22),O=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).handleSort=function(e){var t=Object(y.a)({},a.props.sortColumn);t.path=e,e===a.props.sortColumn.path?t.order="desc"===a.props.sortColumn.order?"asc":"desc":t.order="asc",a.props.onSort(t)},a.renderIcon=function(e){return e!==a.props.sortColumn.path?null:"desc"===a.props.sortColumn.order?r.a.createElement("i",{className:"fa fa-sort-desc"}):r.a.createElement("i",{className:"fa fa-sort-asc"})},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("thead",null,r.a.createElement("tr",null,this.props.columns.map(function(t){return r.a.createElement("th",{scope:"col",className:"movies-tb-header",key:t.label,onClick:function(){return e.handleSort(t.columnName)}},t.label," ",e.renderIcon(t.columnName))})))}}]),t}(n.Component),j=a(43),k=a.n(j),S=a(101),C=function(e){function t(){return Object(o.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return null===this.props.genresMap?(console.log("returning null ............."+this.props.data),null):r.a.createElement("tbody",null,this.props.data.map(function(t){return r.a.createElement("tr",{key:t.id},r.a.createElement("td",null,r.a.createElement("img",{src:"https://image.tmdb.org/t/p/w92/"+t.poster_path,className:"img-fluid",alt:"movie poster"})," "),r.a.createElement("td",null,r.a.createElement(S.a,{className:"movie-meta-data title",to:"/movies/".concat(t.id)},t.title)),r.a.createElement("td",{className:"movie-meta-data"},t.release_date),r.a.createElement("td",{className:"movie-meta-data rate"},t.vote_average),r.a.createElement("td",{className:"movie-meta-data genre"},null!==t?t.genre_ids.map(function(t){return k()(e.props.genresMap.get(t)+"\n")}):""))}))}}]),t}(n.Component),w=function(e){function t(){return Object(o.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"cardcont col-xs-12 col-md-11 col-lg-10 col-centered "},r.a.createElement("div",{className:"table-responsive"},r.a.createElement("table",{className:"table "},r.a.createElement(O,{columns:this.props.columns,onSort:this.props.onSort,sortColumn:this.props.sortColumn}),r.a.createElement(C,{data:this.props.moviesList,genresMap:this.props.genresMap}))))}}]),t}(n.Component),P="LEFT",M="RIGHT",x=function(e){function t(e){var a;Object(o.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).fetchPageNumbers=function(){var e=a.totalPages,t=a.state.currentPage,n=a.pageNeighbours,r=2*a.pageNeighbours+3;if(e>r+2){var s=Math.max(2,t-n),l=Math.min(e-1,t+n),c=N.a.range(s,l+1),o=s>2,i=e-l>1,m=r-(c.length+1);switch(!0){case o&&!i:var u=N.a.range(s-m,s-1);c=[P].concat(Object(b.a)(u),Object(b.a)(c));break;case!o&&i:var d=N.a.range(l+1,l+m);c=[].concat(Object(b.a)(c),Object(b.a)(d),[M]);break;case o&&i:default:c=[P].concat(Object(b.a)(c),[M])}return[1].concat(Object(b.a)(c),[e])}return N.a.range(1,e+1)},a.gotoPage=function(e){var t=a.props.onPageChanged,n=Math.max(0,Math.min(e,a.totalPages)),r={currentPage:n,totalPages:a.totalPages};a.setState({currentPage:n},function(){return t(r)})},a.handleClick=function(e){return function(t){t.preventDefault(),a.gotoPage(e)}},a.handleMoveLeft=function(e){e.preventDefault(),a.gotoPage(a.state.currentPage-2*a.pageNeighbours-1)},a.handleMoveRight=function(e){e.preventDefault(),a.gotoPage(a.state.currentPage+2*a.pageNeighbours+1)};var n=e.itemsCount,r=void 0===n?null:n,s=e.pageLimit,l=void 0===s?10:s,c=e.pageNeighbours,i=void 0===c?0:c;return a.pageLimit="number"===typeof l?l:10,a.itemsCount="number"===typeof r?r:0,a.pageNeighbours="number"===typeof i?Math.max(0,Math.min(i,2)):0,a.totalPages=Math.ceil(a.itemsCount/a.pageLimit),a.state={currentPage:a.props.currentPage},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.gotoPage(this.state.currentPage)}},{key:"componentWillReceiveProps",value:function(e){var t=e.someProp;this.setState(Object(y.a)({},this.state,{someProp:t}))}},{key:"render",value:function(){var e=this,t=this.state.currentPage,a=this.fetchPageNumbers();return r.a.createElement("div",{className:"col-xs-12 col-md-11 col-lg-10 col-centered  pages "},r.a.createElement("nav",{"aria-label":"pagination"},r.a.createElement("ul",{className:"pagination"},a.map(function(a,n){return a===P?r.a.createElement("li",{key:n,className:"page-item"},r.a.createElement("button",{className:"page-link","aria-label":"Previous",onClick:e.handleMoveLeft},r.a.createElement("span",{"aria-hidden":"true"},"\xab"),r.a.createElement("span",{className:"sr-only"},"Previous"))):a===M?r.a.createElement("li",{key:n,className:"page-item"},r.a.createElement("button",{className:"page-link","aria-label":"Next",onClick:e.handleMoveRight},r.a.createElement("span",{"aria-hidden":"true"},"\xbb"),r.a.createElement("span",{className:"sr-only"},"Next"))):r.a.createElement("li",{key:n,className:"page-item".concat(t===a?" active":"")},r.a.createElement("button",{className:"page-link",onClick:e.handleClick(a)},a))}))))}}]),t}(n.Component);var _=function(e){var t=e.searchQuery,a=e.onChange;return r.a.createElement("input",{type:"text",className:"form-control my-3",placeholder:"Search...",value:t,onChange:function(e){return a(e.currentTarget.value)}})},L=a(14),G=a(17),I=a.n(G),A=a(44);I.a.interceptors.response.use(null,function(e){return e.response&&e.response.status>=400&&e.response.status<500||A.toast.error("An unexpected error occurrred."),Promise.reject(e)});var T={get:I.a.get,post:I.a.post,put:I.a.put,delete:I.a.delete};function D(e){return T.get(L.d+e)}function Y(e,t){return T.get(L.d+t+"&page="+e)}var R=a(45),W=a.n(R),B=(a(89),function(e){var t=e.items,a=e.selectedItem,n=e.onItemSelect,s=e.placeholderText;return r.a.createElement(W.a,{options:t,value:a,onChange:n,placeholder:s})});var Q=a(46),U=a.n(Q),z=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={movies:[],genres:[],pageSize:10,currentPage:1,searchQuery:"",selectedGenre:null,genresMap:new Map,sortColumn:{path:"vote_average",order:"desc"},totalPages:null,years:[],selectedYear:(new Date).getFullYear(),isLoading:!0},a.columns=[{columnName:"poster",label:""},{columnName:"title",label:"Title"},{columnName:"release_date",label:"Release Date"},{columnName:"vote_average",label:"Rate"},{columnName:"genre_ids",label:"Genre"}],a.handleGenreSelect=function(e){a.setState({selectedGenre:e,currentPage:1,searchQuery:""})},a.handleYearSelect=function(e){a.setState({isLoading:!0,selectedYear:e.value,selectedGenre:a.state.selectedGenre,currentPage:1,searchQuery:""},function(){a.getComponentContent(e.value)})},a.handleSort=function(e){a.setState({sortColumn:e})},a.handleSearch=function(e){a.setState({searchQuery:e,selectedGenre:null,currentPage:1})},a.handlePageChange=function(e){var t=e.currentPage,n=e.totalPages;a.setState({currentPage:t,totalPages:n})},a.getPreparedData=function(){var e=a.state.movies;if(a.state.searchQuery)e=a.state.movies.filter(function(e){return e.title.toLowerCase().startsWith(a.state.searchQuery.toString().toLowerCase())});else{var t="";a.state.selectedGenre&&(t=Object(b.a)(a.state.genresMap.entries()).filter(function(e){return e[1]===a.state.selectedGenre.value}).map(function(e){return Object(f.a)(e,1)[0]}),t=parseInt(t,10)),e=a.state.selectedGenre&&0!==t?a.state.movies.filter(function(e){return e.genre_ids.includes(t)}):a.state.movies}var n=function(e,t,a){var n=(t-1)*a;return N()(e).slice(n).take(a).value()}(N.a.orderBy(e,a.state.sortColumn.path,a.state.sortColumn.order),a.state.currentPage,a.state.pageSize);return{totalCount:e.length,data:n}},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=Object(v.a)(g.a.mark(function e(){return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.getGenrePairs(),localStorage.getItem("movies")?this.hydrateStateWithLocalStorage():this.getComponentContent(this.state.selectedYear),window.addEventListener("beforeunload",this.saveStateToLocalStorage.bind(this));case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){window.removeEventListener("beforeunload",this.saveStateToLocalStorage.bind(this)),this.saveStateToLocalStorage()}},{key:"saveStateToLocalStorage",value:function(){for(var e in this.state)"genresMap"!==e&&localStorage.setItem(e,JSON.stringify(this.state[e]))}},{key:"hydrateStateWithLocalStorage",value:function(){for(var e in this.state)if("genresMap"!==e&&localStorage.hasOwnProperty(e)){var t=localStorage.getItem(e);try{t=JSON.parse(t),this.setState(Object(p.a)({},e,t))}catch(a){this.setState(Object(p.a)({},e,t))}}}},{key:"getGenrePairs",value:function(){var e=Object(v.a)(g.a.mark(function e(){var t,a,n,r,s;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.get(L.b);case 2:t=e.sent,a=t.data,n=[{id:0,name:"All Genres"}].concat(Object(b.a)(a.genres)),r=new Map(n.map(function(e){return[e.id,e.name]})),s=Object(b.a)(r.values()),this.setState({genres:s,genresMap:r});case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getAllMovies",value:function(){var e=Object(v.a)(g.a.mark(function e(t,a){var n,r,s,l,c,o=this;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n="",r=1;case 2:if(!(r<=t)){e.next=12;break}return e.next=5,Y(r,a);case 5:s=e.sent,l=s.data,c=l.results,n=[].concat(Object(b.a)(n),Object(b.a)(c));case 9:r++,e.next=2;break;case 12:this.setState({movies:n},function(){return o.setState({isLoading:!1})});case 13:case"end":return e.stop()}},e,this)}));return function(t,a){return e.apply(this,arguments)}}()},{key:"getComponentContent",value:function(){var e=Object(v.a)(g.a.mark(function e(t){var a,n,r;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D(t);case 2:a=e.sent,n=a.data,r=n.total_pages>50?50:n.total_pages,this.getAllMovies(r,t);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.getPreparedData(),t=e.totalCount,a=e.data,n=function(){for(var e=[],t=(new Date).getFullYear();t>="1920";t--)e.push(t);return["All Years"].concat(e)}();return console.log("totalCount : "+t),console.log("data : "+a),t&&a&&!this.state.isLoading?r.a.createElement("div",{className:"row justify-content-center padding-outer"},r.a.createElement("div",{className:"col-xs-12 col-md-11 col-lg-10 col-centered"},r.a.createElement("div",{className:"row justify-content-md-center cardcont-f"},r.a.createElement("div",{className:" col-lg-3 col-md-4"},r.a.createElement("p",{className:"label"},"Select Year "),r.a.createElement(B,{items:n,onItemSelect:this.handleYearSelect,placeholderText:this.state.selectedYear})),r.a.createElement("div",{className:"col-lg-4 col-md-4"},r.a.createElement("p",{className:"label"},"Select Genre "),r.a.createElement(B,{items:this.state.genres,selectedItem:this.state.selectedGenre,onItemSelect:this.handleGenreSelect,placeholderText:"All Genres"})),r.a.createElement("div",{className:"col-lg-5 col-md-4"},r.a.createElement("p",{className:"label"},"showing"," ",r.a.createElement("span",{className:"label-val"},this.state.movies.length)," ","movies"),r.a.createElement(_,{value:this.state.searchQuery,onChange:this.handleSearch})))),r.a.createElement(w,{moviesList:a,genresMap:this.state.genresMap,columns:this.columns,sortColumn:this.state.sortColumn,onSort:this.handleSort}),r.a.createElement(x,{itemsCount:t,pageLimit:this.state.pageSize,pageNeighbours:2,currentPage:this.state.currentPage,onPageChanged:this.handlePageChange,key:t})):r.a.createElement("div",{className:"loading"},r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"loading......."),r.a.createElement("img",{src:U.a,className:"App-loading",alt:"loading"})))}}]),t}(n.Component),F=a(103),J=a(104),$=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={data:"",cast:[]},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=Object(v.a)(g.a.mark(function e(){var t,a;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n=this.props.match.params.id,T.get(L.c+n+"?"+L.a);case 2:t=e.sent,a=t.data,this.getCast(),this.setState({data:a}),this.setBackgroundImage("https://image.tmdb.org/t/p/original"+this.state.data.backdrop_path);case 7:case"end":return e.stop()}var n},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){document.body.style.backgroundImage=""}},{key:"getCast",value:function(){var e=Object(v.a)(g.a.mark(function e(){var t,a;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n=this.props.match.params.id,T.get(L.c+n+"/casts?"+L.a);case 2:t=e.sent,a=t.data,this.setState({cast:a});case 5:case"end":return e.stop()}var n},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"setBackgroundImage",value:function(e){var t=e;document.body.style.backgroundImage="url("+t+")",document.body.style.backgroundSize="cover",document.body.style.repeat="no-repeat"}},{key:"getGenreNames",value:function(e){var t="";return e&&e.forEach(function(e){""!==t&&(t+=" , "),t+=e.name}),t}},{key:"getProductionCompanies",value:function(e){var t="";return e&&e.forEach(function(e){""!==t&&(t+=" , "),t+=e.name}),t}},{key:"getCastNames",value:function(e){var t="";return e&&e.slice(0,4).forEach(function(e){""!==t&&(t+=" , "),t+=e.name}),t}},{key:"render",value:function(){return r.a.createElement("div",{className:"row justify-content-center padding-outer"},r.a.createElement("div",{className:"cardcont col-xs-12 col-md-12 col-lg-10 padding-inner"},r.a.createElement("div",{className:"row flex-column-reverse flex-sm-row"},r.a.createElement("div",{className:"col-md-6 col-lg-6"},r.a.createElement("img",{id:"posterContent",className:"poster img-fluid",src:"https://image.tmdb.org/t/p/w500/"+this.state.data.poster_path,style:{height:"auto"},alt:"Poster Content"})),r.a.createElement("div",{className:"col-md-6 col-lg-6"},r.a.createElement("div",{className:"meta-data"},r.a.createElement("h1",{className:"movie-title"},this.state.data.original_title),r.a.createElement("span",{className:"tagline subtitles"},this.state.data.tagline),r.a.createElement("p",{className:"overview"},this.state.data.overview),r.a.createElement("div",null,r.a.createElement("span",{className:"genre-list subtitles"},this.getGenreNames(this.state.data.genres)),r.a.createElement("span",{className:"cast"},this.getCastNames(this.state.cast.cast)),r.a.createElement("br",null)," ",r.a.createElement("br",null),r.a.createElement("span",{className:"production-list prod"},this.getProductionCompanies(this.state.data.production_companies)),r.a.createElement("br",null)," ",r.a.createElement("br",null),r.a.createElement("div",{className:"row nopadding release-details"},r.a.createElement("div",{className:"col-xs-6 col-sm-6 col-md-6 col-lg-6 meta-data-element"},r.a.createElement("span",{className:"subtitles"},"Original Release:"),r.a.createElement("span",{className:"meta-data-val"},this.state.data.release_date)),r.a.createElement("div",{className:"col-xs-6 col-sm-6 col-md-6 col-lg-6 meta-data-element"},r.a.createElement("span",{className:"subtitles"},"Running Time:"),r.a.createElement("span",{className:"meta-data-val"},this.state.data.runtime," mins")),r.a.createElement("div",{className:"col-xs-6 col-sm-6 col-md-6 col-lg-6 meta-data-element"},r.a.createElement("span",{className:"subtitles"},"Box Office:"),r.a.createElement("span",{className:"meta-data-val"},this.state.data.revenue>0?Number(this.state.data.revenue).toLocaleString("en")+" $":"N/A")),r.a.createElement("div",{className:"col-xs-6 col-sm-6 col-md-6 col-lg-6 meta-data-element"},r.a.createElement("span",{className:"subtitles"},"Vote Average:"),r.a.createElement("span",{className:"meta-data-val"},this.state.data.vote_average+" /10")),r.a.createElement("div",{className:"col-xs-6 col-sm-6 col-md-6 col-lg-6 meta-data-element"},r.a.createElement("span",{className:"subtitles"},"Budget:"),r.a.createElement("span",{className:"meta-data-val"},this.state.data.budget<0?Number(this.state.data.budget).toLocaleString("en")+" $":"N/A")),r.a.createElement("div",{className:"col-xs-6 col-sm-6 col-md-6 col-lg-6 meta-data-element"},r.a.createElement("span",{className:"subtitles"},"Adult only:"),r.a.createElement("span",{className:"meta-data-val"},this.state.data.adult?"Yes":"No")))))))))}}]),t}(n.Component),V=function(e){function t(){return Object(o.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement(c.a,{basename:"/TopMovies"},r.a.createElement(F.a,null,r.a.createElement(J.a,{path:"/movies/:id",component:$}),r.a.createElement(J.a,{path:"/movies",component:z}),r.a.createElement(J.a,{path:"/",component:z}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(91),a(92);var q=function(){return r.a.createElement("footer",{className:"footer page-footer font-small blue"},r.a.createElement("div",{className:"footer-text footer-copyright text-center "}," ",r.a.createElement("a",{className:"footer-link",href:"https://www.linkedin.com/in/amr-gamal-11901a33/"}," ","\xa9 Developed by Amr Gamal"),r.a.createElement("br",null),r.a.createElement("a",{className:"footer-link",href:"https://github.com/amrgamal91/Top-Movies"},r.a.createElement("i",{className:"fa fa-github","aria-hidden":"true"})," View code")))},H=a(16),K=a(48),X=a.n(K),Z={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)",padding:0}},ee=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(m.a)(this,Object(u.a)(t).call(this))).state={modalIsOpen:!1},e.openModal=e.openModal.bind(Object(H.a)(Object(H.a)(e))),e.closeModal=e.closeModal.bind(Object(H.a)(Object(H.a)(e))),e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"openModal",value:function(){this.setState({modalIsOpen:!0})}},{key:"closeModal",value:function(){this.setState({modalIsOpen:!1})}},{key:"render",value:function(){return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light nav hidden-phone"},r.a.createElement("a",{className:"navbar-brand navbrand",href:"#"},r.a.createElement("i",{className:"fa fa-video-camera","aria-hidden":"true"})," Top Movies"),r.a.createElement("span",{className:"navbar-text"},"Enjoy Watching "),r.a.createElement("button",{type:"button",className:"btn btn-danger btn-circle","data-toggle":"modal","data-target":"#infoModal",onClick:this.openModal},r.a.createElement("i",{className:"fa fa-info-circle info"})),r.a.createElement("div",null,r.a.createElement(X.a,{isOpen:this.state.modalIsOpen,onRequestClose:this.closeModal,style:Z},r.a.createElement("div",{className:"modal-dialog",role:"document"},r.a.createElement("div",{className:"modal-content"},r.a.createElement("div",{className:"modal-header"},r.a.createElement("h5",{className:"modal-title",id:"infoModal"},"About Top Movies"),r.a.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close",onClick:this.closeModal},r.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),r.a.createElement("div",{className:"modal-body"},r.a.createElement("ul",null,r.a.createElement("li",null,"Top Movies shows all movies with rate more than 6"),r.a.createElement("li",null,"Movies can be filtered with genres & years"),r.a.createElement("li",null,"By selecting the movie , you can see more details about the movie like staff , revenue , ...etc"))))))))}}]),t}(n.Component);l.a.render(r.a.createElement(c.a,null,r.a.createElement(r.a.Fragment,null,r.a.createElement(ee,null),r.a.createElement(V,null),r.a.createElement(q,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},14:function(e){e.exports={a:"&api_key=cfe422613b250f702980a3bbf9e90716",b:"https://api.themoviedb.org/3/genre/movie/list?api_key=cfe422613b250f702980a3bbf9e90716&language=en-US",c:"https://api.themoviedb.org/3/movie/",d:"https://api.themoviedb.org/3/discover/movie?api_key=cfe422613b250f702980a3bbf9e90716&language=en-US&region=US&sort_by=vote_average.desc&include_video=false&page=1&vote_count.gte=100&vote_average.gte=6&primary_release_year="}},32:function(e,t,a){},46:function(e,t,a){e.exports=a.p+"static/media/spinner-loading.ff6e5c7f.svg"},50:function(e,t,a){e.exports=a(100)},55:function(e,t,a){}},[[50,1,2]]]);
//# sourceMappingURL=main.22b25019.chunk.js.map