!function (B,i){
  "use strict"; var t,r,D,a,c = `commento`,m = `commento-main-area`,l = `commento-login`,T = `commento-login-box-container`,H = `commento-login-box`,C = `commento-login-box-email-subtitle`,L = `commento-login-box-email-input`,u = `commento-login-box-password-input`,p = `commento-login-box-name-input`,v = `commento-login-box-website-input`,M = `commento-login-box-email-button`,S = `commento-login-box-forgot-link-container`,N = `commento-login-box-login-link-container`,E = `commento-login-box-sso-pretext`,A = `commento-login-box-sso-buttton-container`,R = `commento-login-box-hr1`,O = `commento-login-box-oauth-pretext`,P = `commento-login-box-oauth-buttons-container`,U = `commento-login-box-hr2`,d = `commento-mod-tools`,n = `commento-mod-tools-lock-button`,s = `commento-error`,f = `commento-logged-container`,h = `commento-pre-comments-area`,g = `commento-comments-area`,k = `commento-textarea-super-container-`,x = `commento-textarea-container-`,b = `commento-textarea-`,w = `commento-anonymous-checkbox-`,y = `commento-sort-policy-`,I = `commento-comment-card-`,q = `commento-comment-body-`,j = `commento-comment-text-`,W = `commento-comment-subtitle-`,Y = `commento-comment-timeago-`,_ = `commento-comment-score-`,F = `commento-comment-options-`,J = `commento-comment-edit-`,V = `commento-comment-reply-`,X = `commento-comment-collapse-`,z = `commento-comment-upvote-`,G = `commento-comment-downvote-`,$ = `commento-comment-approve-`,K = `commento-comment-remove-`,Q = `commento-comment-sticky-`,Z = `commento-comment-children-`,ee = `commento-comment-contents-`,oe = `commento-comment-name-`,ne = `commento-submit-button-`,te = `commento-markdown-button-`,ie = `commento-markdown-help-`,re = `https://commento.io`,ae = `https://cdn.commento.io`,ce = null,me = parent.location.pathname,le = !1,de = [],se = {},ue = {},pe = !0,ve = !1,fe = !1,he = !1,ge = !1,xe = `none`,be = {},we = {},ye = {},ke = `login`,Te = !1,He = `score-desc`,Ce = void 0,Le = null; function Me(e){
    return i.getElementById(e)
  } function Se(e,o){
    e.prepend(o)
  } function Ne(e,o){
    e.appendChild(o)
  } function Be(e,o){
    e.parentNode.insertBefore(o,e.nextSibling)
  } function De(e,o){
    e.classList.add(`commento-` + o)
  } function Ee(e,o){
    null !== e && e.classList.remove(`commento-` + o)
  } function Ae(e){
    return i.createElement(e)
  } function Re(e){
    null !== e && e.parentNode.removeChild(e)
  } function Oe(e,o){
    var n = e.attributes[o]; if (void 0 !== n) {
      return n.value
    }
  } function Pe(e){
    if (null !== e){
      var o = e.cloneNode(!0); if (null !== e.parentNode) {
        return e.parentNode.replaceChild(o,e),o
      }
    } return e
  } function Ue(e,o,n){
    e.addEventListener(`click`,function (){
      o(n)
    },!1)
  } function Ie(e,o,n){
    e.setAttribute(o,n)
  } function qe(e,o,n){
    var t = new XMLHttpRequest; t.open(`POST`,e,!0),t.setRequestHeader(`Content-type`,`application/x-www-form-urlencoded`),t.onload = function (){
      n(JSON.parse(t.response))
    },t.send(JSON.stringify(o))
  } function je(e){
    `function` === typeof e && e()
  } function We(e,o){
    var n,t = new Date; t.setTime(t.getTime() + 31536e6),n = `; expires=` + t.toUTCString(),i.cookie = e + `=` + o + n + `; path=/`
  } function Ye(){
    var e = function (e){
      var o = (`; ` + i.cookie).split(`; ` + e + `=`); if (2 === o.length) {
        return o.pop().split(`;`).shift()
      }
    }(`commentoCommenterToken`); return void 0 === e ? `anonymous` : e
  } function _e(){
    window.open(re + `/profile?commenterToken=` + Ye(),`_blank`)
  } function Fe(e){
    window.open(re + `/unsubscribe?unsubscribeSecretHex=` + e,`_blank`)
  } function Je(e,o){
    ue[e.commenterHex] = e,Ce = e.commenterHex; var n,t,i = Ae(`div`),r = Ae(`div`); n = `undefined` !== e.link ? Ae(`a`) : Ae(`div`); var a = Ae(`div`),c = Ae(`div`),m = Ae(`div`),l = io(e.commenterHex + `-` + e.name); i.id = f,De(i,`logged-container`),De(r,`logged-in-as`),De(n,`name`),De(a,`profile-button`),De(c,`profile-button`),De(m,`profile-button`),n.innerText = e.name,a.innerText = `Notification Settings`,c.innerText = `Edit Profile`,m.innerText = `Logout`,Ue(m,B.logout),console.log(e),Ue(a,Fe,o.unsubscribeSecretHex),Ue(c,_e),Ie(i,`style`,`display: none`),`undefined` !== e.link && Ie(n,`href`,e.link),`undefined` === e.photo ? ((t = Ae(`div`)).style.background = l,t.innerHTML = e.name[0].toUpperCase(),De(t,`avatar`)) : (Ie(t = Ae(`img`),`src`,`https://cdn.commento.io/api/commenter/photo?commenterHex=` + e.commenterHex),De(t,`avatar-img`)),Ne(r,t),Ne(r,n),Ne(i,r),Ne(i,m),`commento` === e.provider && Ne(i,c),Ne(i,a),Se(ce,i),le = !0
  } function Ve(o){
    if (`anonymous` === Ye()) {
      return le = !1,void je(o)
    } var e = { commenterToken: Ye() }; qe(re + `/api/commenter/self`,e,function (e){
      if (!e.success) {
        return We(`commentoCommenterToken`,`anonymous`),void je(o)
      } Je(e.commenter,e.email),B.allShow(),je(o)
    })
  } function Xe(e,o){
    var n = Ae(`link`),t = i.getElementsByTagName(`head`)[0]; n.type = `text/css`,Ie(n,`href`,e),Ie(n,`rel`,`stylesheet`),Ie(n,`onload`,o),Ne(t,n)
  } function ze(o){
    var e = { commenterToken: Ye(),domain: parent.location.host,path: me }; qe(re + `/api/comment/list`,e,function (e){
      e.success ? ($e(),pe = e.requireIdentification,ve = e.isModerator,fe = e.isFrozen,ge = e.attributes.isLocked,xe = e.attributes.stickyCommentHex,de = e.comments,ue = Object.assign({},ue,e.commenters),ye = e.configuredOauths,He = e.defaultSortPolicy,je(o)) : Ge(e.message)
    })
  } function Ge(e){
    var o = Me(s); o.innerText = e,Ie(o,`style`,`display: block;`)
  } function $e(){
    Ie(Me(s),`style`,`display: none;`)
  } function Ke(e){
    var o = Me(k + e),n = Me(te + e),t = Ae(`table`),i = Ae(`tr`),r = Ae(`td`),a = Ae(`td`),c = Ae(`tr`),m = Ae(`td`),l = Ae(`td`),d = Ae(`tr`),s = Ae(`td`),u = Ae(`td`),p = Ae(`tr`),v = Ae(`td`),f = Ae(`td`),h = Ae(`tr`),g = Ae(`td`),x = Ae(`td`),b = Ae(`tr`),w = Ae(`td`),y = Ae(`td`); t.id = ie + e,De(t,`markdown-help`),m.innerHTML = `<b>bold</b>`,l.innerHTML = `surround text with <pre>**two asterisks**</pre>`,r.innerHTML = `<i>italics</i>`,a.innerHTML = `surround text with <pre>*asterisks*</pre>`,s.innerHTML = `<pre>code</pre>`,u.innerHTML = `surround text with <pre>\`backticks\`</pre>`,v.innerHTML = `<strike>strikethrough</strike>`,f.innerHTML = `surround text with <pre>~~two tilde characters~~</pre>`,g.innerHTML = `<a href="https://example.com">hyperlink</a>`,x.innerHTML = `<pre>[hyperlink](https://example.com)</pre> or just a bare URL`,w.innerHTML = `<blockquote>quote</blockquote>`,y.innerHTML = `prefix with <pre>&gt;</pre>`,Ue(n = Pe(n),Qe,e),Ne(i,r),Ne(i,a),Ne(t,i),Ne(c,m),Ne(c,l),Ne(t,c),Ne(h,g),Ne(h,x),Ne(t,h),Ne(d,s),Ne(d,u),Ne(t,d),Ne(p,v),Ne(p,f),Ne(t,p),Ne(b,w),Ne(b,y),Ne(t,b),Ne(o,t)
  } function Qe(e){
    var o = Me(te + e),n = Me(ie + e); Ue(o = Pe(o),Ke,e),Re(n)
  } function Ze(e,o){
    var n = Ae(`div`),t = Ae(`div`),i = Ae(`textarea`),r = Ae(`div`),a = Ae(`input`),c = Ae(`label`),m = Ae(`button`),l = Ae(`a`); return n.id = k + e,t.id = x + e,i.id = b + e,a.id = w + e,m.id = ne + e,l.id = te + e,De(t,`textarea-container`),De(r,`round-check`),De(r,`anonymous-checkbox-container`),De(m,`button`),De(m,`submit-button`),De(l,`markdown-button`),De(n,`button-margin`),Ie(i,`placeholder`,`Add a comment`),Ie(a,`type`,`checkbox`),Ie(c,`for`,w + e),c.innerText = `Comment anonymously`,m.innerText = !0 === o ? `Save Changes` : `Add Comment`,l.innerHTML = `<b>M &#8595;</b> &nbsp; Markdown`,i.oninput = function (e){
      return function (){
        e.style.height = ``,e.style.height = Math.min(Math.max(e.scrollHeight,75),400) + `px`
      }
    }(i),Ue(m,!0 === o ? lo : vo,e),Ue(l,Ke,e),Ne(t,i),Ne(n,t),Ne(r,a),Ne(r,c),Ne(n,m),pe || !0 === o || Ne(n,r),Ne(n,l),n
  }B.logout = function (){
    We(`commentoCommenterToken`,`anonymous`),ve = le = !1,Ce = void 0,o()
  }; var eo = { "score-desc": `Upvotes`,"creationdate-desc": `Newest`,"creationdate-asc": `Oldest` }; function oo(e){
    Ee(Me(y + He),`sort-policy-button-selected`); var o = Me(g); o.innerHTML = ``,He = e; var n = co(so(de),`root`); n && Ne(o,n),De(Me(y + e),`sort-policy-button-selected`)
  } function no(e){
    var o = Ae(`div`),n = Ae(`div`),t = Me(m),i = Ae(`div`),r = Ae(`div`); o.id = l,i.id = h,r.id = g,De(o,`login`),De(n,`login-text`),De(r,`comments`),n.innerText = `Login`,r.innerHTML = ``,Ue(n,B.loginBoxShow,null),Ne(o,n),ge || fe ? le || he ? (Ne(t,to(`This thread is locked. You cannot add new comments.`)),Re(Me(l))) : (Ne(t,o),Ne(t,Ze(`root`))) : (le ? Re(Me(l)) : Ne(t,o),Ne(t,Ze(`root`))),0 < de.length && Ne(t,function (){
      var e = Ae(`div`),o = Ae(`div`); for (var n in De(e,`sort-policy-buttons-container`),De(o,`sort-policy-buttons`),eo){
        var t = Ae(`a`); t.id = y + n,De(t,`sort-policy-button`),n === He && De(t,`sort-policy-button-selected`),t.innerText = eo[n],Ue(t,oo,n),Ne(o,t)
      } return Ne(e,o),e
    }()),Ne(t,i),Ne(t,r),Ne(ce,t),je(e)
  } function to(e){
    var o = Ae(`div`); return De(o,`moderation-notice`),o.innerText = e,o
  } function io(e){
    for (var o = [`#396ab1`,`#da7c30`,`#3e9651`,`#cc2529`,`#922428`,`#6b4c9a`,`#535154`],n = 0,t = 0; t < e.length; t++){
      n += e.charCodeAt(t)
    } return o[n % o.length]
  } function ro(e){
    return 1 !== e ? e + ` points` : e + ` point`
  }B.commentNew = function (r,a,c){
    var m = Me(k + r),l = Me(b + r),d = Me(V + r),s = l.value; if (`` !== s){
      Ee(l,`red-border`); var e = { commenterToken: a,domain: parent.location.host,path: me,parentHex: r,markdown: s }; qe(re + `/api/comment/new`,e,function (e){
        if (e.success){
          $e(); var o = ``; `unapproved` === e.state ? o = `Your comment is under moderation.` : `flagged` === e.state && (o = `Your comment was flagged as spam and is under moderation.`),`` !== o && Se(Me(k + r),to(o)); var n = Ce; void 0 !== n && `anonymous` !== a || (n = `anonymous`); var t = { commentHex: e.commentHex,commenterHex: n,markdown: s,html: e.html,parentHex: `root`,score: 0,state: `approved`,direction: 0,creationDate: new Date },i = co({ root: [t] },`root`); se[e.commentHex] = t,`root` !== r ? (m.replaceWith(i),be[r] = !1,De(d,`option-reply`),Ee(d,`option-cancel`),d.title = `Reply to this comment`,Ue(d,B.replyShow,r)) : (l.value = ``,Be(Me(h),i)),je(c)
        } else {
          Ge(e.message)
        }
      })
    } else {
      De(l,`red-border`)
    }
  }; var ao = { "score-desc": function (e,o){
    return o.score - e.score
  },"creationdate-desc": function (e,o){
    return e.creationDate < o.creationDate ? 1 : -1
  },"creationdate-asc": function (e,o){
    return e.creationDate < o.creationDate ? -1 : 1
  } }; function co(L,M){
    var e = L[M]; if (!e || !e.length) {
      return null
    } e.sort(function (e,o){
      return e.deleted || e.commentHex !== xe ? o.deleted || o.commentHex !== xe ? ao[He](e,o) : 1 / 0 : -1 / 0
    }); var S = (new Date).getTime(),N = Ae(`div`); return e.forEach(function (e){
      var o,n,t = ue[e.commenterHex],i = Ae(`div`),r = Ae(`div`),a = Ae(`div`),c = Ae(`div`),m = Ae(`div`),l = Ae(`div`),d = Ae(`div`),s = Ae(`div`),u = Ae(`button`),p = Ae(`button`),v = Ae(`button`),f = Ae(`button`),h = Ae(`button`),g = Ae(`button`),x = Ae(`button`),b = Ae(`button`),w = co(L,e.commentHex),y = Ae(`div`),k = io(e.commenterHex + `-` + t.name); if (n = `undefined` !== t.link && `https://undefined` !== t.link && `` !== t.link ? Ae(`a`) : Ae(`div`),i.id = I + e.commentHex,l.id = q + e.commentHex,d.id = j + e.commentHex,a.id = W + e.commentHex,c.id = Y + e.commentHex,m.id = _ + e.commentHex,s.id = F + e.commentHex,u.id = J + e.commentHex,p.id = V + e.commentHex,v.id = X + e.commentHex,f.id = z + e.commentHex,h.id = G + e.commentHex,g.id = $ + e.commentHex,x.id = K + e.commentHex,b.id = Q + e.commentHex,w && (w.id = Z + e.commentHex),y.id = ee + e.commentHex,n.id = oe + e.commentHex,v.title = `Collapse children`,f.title = `Upvote`,h.title = `Downvote`,u.title = `Edit`,p.title = `Reply`,g.title = `Approve`,x.title = `Remove`,xe === e.commentHex ? b.title = ve ? `Unsticky` : `This comment has been stickied` : b.title = `Sticky`,c.title = e.creationDate.toString(),i.style.borderLeft = `2px solid ` + k,e.deleted ? n.innerText = `[deleted]` : n.innerText = t.name,d.innerHTML = e.html,c.innerHTML = function (e,o){
        var n = 2592e6,t = e - o; return t < 5e3 ? `just now` : t < 12e4 ? Math.round(t / 1e3) + ` seconds ago` : t < 72e5 ? Math.round(t / 6e4) + ` minutes ago` : t < 1728e5 ? Math.round(t / 36e5) + ` hours ago` : t < 5184e6 ? Math.round(t / 864e5) + ` days ago` : t < 62208e6 ? Math.round(t / n) + ` months ago` : Math.round(t / 31104e6) + ` years ago`
      }(S,e.creationDate),m.innerText = ro(e.score),`undefined` === t.photo ? ((o = Ae(`div`)).style.background = k,`anonymous` === e.commenterHex ? (o.innerHTML = `?`,o.style[`font-weight`] = `bold`) : o.innerHTML = t.name[0].toUpperCase(),De(o,`avatar`)) : (Ie(o = Ae(`img`),`src`,`https://cdn.commento.io/api/commenter/photo?commenterHex=` + t.commenterHex),De(o,`avatar-img`)),De(i,`card`),ve && `approved` !== e.state && De(i,`dark-card`),t.isModerator && De(n,`moderator`),`flagged` === e.state && De(n,`flagged`),De(r,`header`),De(n,`name`),De(a,`subtitle`),De(c,`timeago`),De(m,`score`),De(l,`body`),De(s,`options`),Le && De(s,`options-mobile`),De(u,`option-button`),De(u,`option-edit`),De(p,`option-button`),De(p,`option-reply`),De(v,`option-button`),De(v,`option-collapse`),De(f,`option-button`),De(f,`option-upvote`),De(h,`option-button`),De(h,`option-downvote`),De(g,`option-button`),De(g,`option-approve`),De(x,`option-button`),De(x,`option-remove`),De(b,`option-button`),xe === e.commentHex ? De(b,`option-unsticky`) : De(b,`option-sticky`),le && (0 < e.direction ? De(f,`upvoted`) : e.direction < 0 && De(h,`downvoted`)),Ue(u,B.editShow,e.commentHex),Ue(v,B.commentCollapse,e.commentHex),Ue(g,B.commentApprove,e.commentHex),Ue(x,B.commentDelete,e.commentHex),Ue(b,B.commentSticky,e.commentHex),le){
        var T = mo(f,h,e.commentHex,e.direction); f = T[0],h = T[1]
      } else {
        Ue(f,B.loginBoxShow,null),Ue(h,B.loginBoxShow,null)
      }Ue(p,B.replyShow,e.commentHex),`undefined` !== t.link && `https://undefined` !== t.link && `` !== t.link && Ie(n,`href`,t.link),Ne(s,v),e.deleted || (Ne(s,h),Ne(s,f)),e.commenterHex === Ce ? Ne(s,u) : e.deleted || Ne(s,p),!e.deleted && ve && `root` === M && Ne(s,b),e.deleted || !ve && e.commenterHex !== Ce || Ne(s,x),ve && `approved` !== e.state && Ne(s,g),e.deleted || ve || xe !== e.commentHex || Ne(s,b),Ie(s,`style`,`width: ` + 32 * (s.childNodes.length + 1) + `px;`); for (var H = 0; H < s.childNodes.length; H++){
        Ie(s.childNodes[H],`style`,`right: ` + 32 * H + `px;`)
      } if (Ne(a,m),Ne(a,c),Le || Ne(r,s),Ne(r,o),Ne(r,n),Ne(r,a),Ne(l,d),Ne(y,l),Le){
        Ne(y,s); var C = Ae(`div`); De(C,`options-clearfix`),Ne(y,C)
      }w && (De(w,`body`),Ne(y,w)),Ne(i,r),Ne(i,y),e.deleted && (`true` === D || null === w) || Ne(N,i)
    }),0 === N.childNodes.length ? null : N
  } function mo(e,o,n,t){
    return e = Pe(e),o = Pe(o),0 < t ? (Ue(e,B.vote,[n,[1,0]]),Ue(o,B.vote,[n,[1,-1]])) : t < 0 ? (Ue(e,B.vote,[n,[-1,1]]),Ue(o,B.vote,[n,[-1,0]])) : (Ue(e,B.vote,[n,[0,1]]),Ue(o,B.vote,[n,[0,-1]])),[e,o]
  } function lo(i){
    var e = Me(b + i),r = e.value; if (`` !== r){
      Ee(e,`red-border`); var o = { commenterToken: Ye(),commentHex: i,markdown: r }; qe(re + `/api/comment/edit`,o,function (e){
        if (e.success){
          $e(),se[i].markdown = r,se[i].html = e.html; var o = Me(J + i),n = Me(k + i); n.innerHTML = se[i].html,n.id = j + i,delete we[i],De(o,`option-edit`),Ee(o,`option-cancel`),o.title = `Edit comment`,Ue(o = Pe(o),B.editShow,i); var t = ``; `unapproved` === e.state ? t = `Your comment is under moderation.` : `flagged` === e.state && (t = `Your comment was flagged as spam and is under moderation.`),`` !== t && Se(Me(k + i),to(t))
        } else {
          Ge(e.message)
        }
      })
    } else {
      De(e,`red-border`)
    }
  } function so(e){
    var n = {}; return e.forEach(function (e){
      var o = e.parentHex; o in n || (n[o] = []),e.creationDate = new Date(e.creationDate),n[o].push(e),se[e.commentHex] = { html: e.html,markdown: e.markdown }
    }),n
  } function uo(){
    var e = Me(g); e.innerHTML = ``; var o = co(so(de),`root`); o && Ne(e,o)
  } function po(e){
    le ? B.commentNew(e,Ye()) : B.loginBoxShow(e)
  } function vo(e){
    if (pe){
      po(e)
    } else {
      var o = Me(w + e),n = Me(b + e); if (`` !== n.value) {
        return Ee(n,`red-border`),o.checked ? void function (e){
          he = !0,B.commentNew(e,`anonymous`)
        }(e) : void po(e)
      } De(n,`red-border`)
    }
  } function o(e){
    Me(c).innerHTML = ``,be = {},B.main(e)
  } function fo(e,o,n){
    qe(re + `/api/commenter/login`,{ email: e,password: o },function (e){
      if (!e.success) {
        return B.loginBoxClose(),void Ge(e.message)
      } $e(),We(`commentoCommenterToken`,e.commenterToken),Je(e.commenter,e.email),B.allShow(),Re(Me(l)),null !== n ? B.commentNew(n,e.commenterToken,function (){
        B.loginBoxClose(),ze(uo)
      }) : (B.loginBoxClose(),ze(uo))
    })
  } function ho(o){
    var e = { isLocked: ge,stickyCommentHex: xe },n = { commenterToken: Ye(),domain: parent.location.host,path: me,attributes: e }; qe(re + `/api/page/update`,n,function (e){
      e.success ? ($e(),je(o)) : Ge(e.message)
    })
  } function e(){
    for (var e = function (e){
        return i.getElementsByTagName(e)
      }(`script`),o = 0; o < e.length; o++) {
      if (e[o].src.match(/\/js\/commento\.js$/)){
        var n = Oe(e[o],`data-page-id`); void 0 !== n && (me = n),t = Oe(e[o],`data-css-override`),a = Oe(e[o],`data-auto-init`),void 0 === (c = Oe(e[o],`data-id-root`)) && (c = `commento`),r = Oe(e[o],`data-no-fonts`),D = Oe(e[o],`data-hide-deleted`)
      }
    }
  }B.commentApprove = function (i){
    var e = { commenterToken: Ye(),commentHex: i }; qe(re + `/api/comment/approve`,e,function (e){
      if (e.success){
        $e(); var o = Me(I + i),n = Me(oe + i),t = Me($ + i); Ee(o,`dark-card`),Ee(n,`flagged`),Re(t)
      } else {
        Ge(e.message)
      }
    })
  },B.commentDelete = function (o){
    if (confirm(`Are you sure you want to delete this comment?`)){
      var e = { commenterToken: Ye(),commentHex: o }; qe(re + `/api/comment/delete`,e,function (e){
        e.success ? ($e(),Me(j + o).innerText = `[deleted]`) : Ge(e.message)
      })
    }
  },B.vote = function (e){
    var o = e[0],n = e[1][0],t = e[1][1],i = Me(z + o),r = Me(G + o),a = Me(_ + o),c = { commenterToken: Ye(),commentHex: o,direction: t },m = mo(i,r,o,t); i = m[0],r = m[1],Ee(i,`upvoted`),Ee(r,`downvoted`),0 < t ? De(i,`upvoted`) : t < 0 && De(r,`downvoted`),a.innerText = ro(parseInt(a.innerText.replace(/[^\d-.]/g,``)) + t - n),qe(re + `/api/comment/vote`,c,function (e){
      if (!e.success) {
        return Ge(e.message),Ee(i,`upvoted`),Ee(r,`downvoted`),a.innerText = ro(parseInt(a.innerText.replace(/[^\d-.]/g,``)) - t + n),void mo(i,r,o,n)
      } $e()
    })
  },B.editShow = function (e){
    if (!(e in we && we[e])){
      var o = Me(j + e); we[e] = !0,o.replaceWith(Ze(e,!0)),Me(b + e).value = se[e].markdown; var n = Me(J + e); Ee(n,`option-edit`),De(n,`option-cancel`),n.title = `Cancel edit`,Ue(n = Pe(n),B.editCollapse,e)
    }
  },B.editCollapse = function (e){
    var o = Me(J + e),n = Me(k + e); n.innerHTML = se[e].html,n.id = j + e,delete we[e],De(o,`option-edit`),Ee(o,`option-cancel`),o.title = `Edit comment`,Ue(o = Pe(o),B.editShow,e)
  },B.replyShow = function (e){
    if (!(e in be && be[e])){
      Be(Me(j + e),Ze(e)),be[e] = !0; var o = Me(V + e); Ee(o,`option-reply`),De(o,`option-cancel`),o.title = `Cancel reply`,Ue(o = Pe(o),B.replyCollapse,e)
    }
  },B.replyCollapse = function (e){
    var o = Me(V + e); Me(k + e).remove(),delete be[e],De(o,`option-reply`),Ee(o,`option-cancel`),o.title = `Reply to this comment`,Ue(o = Pe(o),B.replyShow,e)
  },B.commentCollapse = function (e){
    var o = Me(Z + e),n = Me(X + e); o && De(o,`hidden`),Ee(n,`option-collapse`),De(n,`option-uncollapse`),n.title = `Expand children`,Ue(n = Pe(n),B.commentUncollapse,e)
  },B.commentUncollapse = function (e){
    var o = Me(Z + e),n = Me(X + e); o && Ee(o,`hidden`),Ee(n,`option-uncollapse`),De(n,`option-collapse`),n.title = `Collapse children`,Ue(n = Pe(n),B.commentCollapse,e)
  },B.commentoAuth = function (e){
    var n = e.provider,t = e.id,i = window.open(``,`_blank`); !function (e,o){
      var n = new XMLHttpRequest; n.open(`GET`,e,!0),n.onload = function (){
        o(JSON.parse(n.response))
      },n.send(null)
    }(re + `/api/commenter/token/new`,function (o){
      if (o.success){
        $e(),We(`commentoCommenterToken`,o.commenterToken),i.location = re + `/api/oauth/` + n + `/redirect?commenterToken=` + o.commenterToken; var e = setInterval(function (){
          i.closed && (clearInterval(e),Ve(function (){
            var e = Me(f); e && Ie(e,`style`,``),`anonymous` !== Ye() && Re(Me(l)),null !== t ? B.commentNew(t,o.commenterToken,function (){
              B.loginBoxClose(),ze(uo)
            }) : (B.loginBoxClose(),ze(uo))
          }))
        },250)
      } else {
        Ge(o.message)
      }
    })
  },B.popupRender = function (n){
    var e = Me(T),o = Ae(`div`),t = Ae(`div`),i = Ae(`div`),r = Ae(`div`),a = Ae(`hr`),c = Ae(`div`),m = Ae(`div`),l = Ae(`div`),d = Ae(`hr`),s = Ae(`div`),u = Ae(`div`),p = Ae(`div`),v = Ae(`input`),f = Ae(`button`),h = Ae(`div`),g = Ae(`a`),x = Ae(`div`),b = Ae(`a`),w = Ae(`div`); o.id = H,s.id = C,v.id = L,f.id = M,h.id = S,x.id = N,i.id = A,t.id = E,a.id = R,c.id = O,m.id = P,d.id = U,De(e,`login-box-container`),De(o,`login-box`),De(s,`login-box-subtitle`),De(u,`email-container`),De(p,`email`),De(v,`input`),De(f,`email-button`),De(h,`forgot-link-container`),De(g,`forgot-link`),De(x,`login-link-container`),De(b,`login-link`),De(t,`login-box-subtitle`),De(i,`oauth-buttons-container`),De(r,`oauth-buttons`),De(c,`login-box-subtitle`),De(m,`oauth-buttons-container`),De(l,`oauth-buttons`),De(w,`login-box-close`),De(ce,`root-min-height`),g.innerText = `Forgot your password?`,b.innerText = `Don't have an account? Sign up.`,s.innerText = `Login with your email address`,f.innerText = `Continue`,c.innerText = `Proceed with social login`,t.innerText = `Proceed with ` + parent.location.host + ` authentication`,Ue(f,B.passwordAsk,n),Ue(g,B.forgotPassword,n),Ue(b,B.popupSwitch,n),Ue(w,B.loginBoxClose),Ie(e,`style`,`display: none; opacity: 0;`),Ie(v,`name`,`email`),Ie(v,`placeholder`,`Email address`),Ie(v,`type`,`text`); var y = 0; if ([`google`,`twitter`,`github`,`gitlab`].forEach(function (e){
      if (ye[e]){
        var o = Ae(`button`); De(o,`button`),De(o,e + `-button`),o.innerText = e,Ue(o,B.commentoAuth,{ provider: e,id: n }),Ne(l,o),y++
      }
    }),ye.sso){
      var k = Ae(`button`); De(k,`button`),De(k,`sso-button`),k.innerText = `Single Sign-On`,Ue(k,B.commentoAuth,{ provider: `sso`,id: n }),Ne(r,k),Ne(i,r),Ne(o,t),Ne(o,i),(0 < y || ye.commento) && Ne(o,a)
    }Te = 0 < y && (Ne(o,c),Ne(m,l),Ne(o,m),!0),Ne(p,v),Ne(p,f),Ne(u,p),Ne(h,g),Ne(x,b),0 < y && ye.commento && Ne(o,d),ye.commento && (Ne(o,s),Ne(o,u),Ne(o,h),Ne(o,x)),Ne(o,w),ke = `login`,e.innerHTML = ``,Ne(e,o)
  },B.forgotPassword = function (){
    window.open(``,`_blank`).location = re + `/forgot?commenter=true`,B.loginBoxClose()
  },B.popupSwitch = function (e){
    var o = Me(C); Te && (Re(Me(P)),Re(Me(O)),Re(Me(R)),Re(Me(U))),ye.sso && (Re(Me(A)),Re(Me(E)),Re(Me(R)),Re(Me(U))),Re(Me(N)),Re(Me(S)),o.innerText = `Create an account`,ke = `signup`,B.passwordAsk(e),Me(L).focus()
  },B.login = function (e){
    var o = Me(L),n = Me(u); fo(o.value,n.value,e)
  },B.signup = function (o){
    var n = Me(L),e = Me(p),t = Me(v),i = Me(u),r = { email: n.value,name: e.value,website: t.value,password: i.value }; qe(re + `/api/commenter/new`,r,function (e){
      if (!e.success) {
        return B.loginBoxClose(),void Ge(e.message)
      } $e(),fo(n.value,i.value,o)
    })
  },B.passwordAsk = function (e){
    var o,n,t,i,r = Me(H),a = Me(C); Re(Me(M)),Re(Me(N)),Re(Me(S)),Te && 0 < ye.length && (Re(Me(R)),Re(Me(U)),Re(Me(O)),Re(Me(P))),i = `signup` === ke ? (o = [`name`,`website`,`password`],n = [p,v,u],t = [`text`,`text`,`password`],[`Real Name`,`Website (Optional)`,`Password`]) : (o = [`password`],n = [u],t = [`password`],[`Password`]),a.innerText = `signup` === ke ? `Finish the rest of your profile to complete.` : `Enter your password to log in.`; for (var c = 0; c < o.length; c++){
      var m = Ae(`div`),l = Ae(`div`),d = Ae(`input`); if (d.id = n[c],De(m,`email-container`),De(l,`email`),De(d,`input`),Ie(d,`name`,o[c]),Ie(d,`type`,t[c]),Ie(d,`placeholder`,i[c]),Ne(l,d),Ne(m,l),`password` === o[c]){
        var s = Ae(`button`); De(s,`email-button`),s.innerText = ke,Ue(s,`signup` === ke ? B.signup : B.login,e),Ne(l,s)
      }Ne(r,m)
    }`signup` === ke ? Me(p).focus() : Me(u).focus()
  },B.threadLockToggle = function (){
    var e = Me(n); ge = !ge,e.disabled = !0,ho(function (){
      e.disabled = !1,o()
    })
  },B.commentSticky = function (o){
    if (`none` !== xe){
      var e = Me(Q + xe); null === e ? xe = `none` : (Ee(e,`option-unsticky`),De(e,`option-sticky`))
    }xe = xe === o ? `none` : o,ho(function (){
      var e = Me(Q + o); xe === o ? (Ee(e,`option-sticky`),De(e,`option-unsticky`)) : (Ee(e,`option-unsticky`),De(e,`option-sticky`))
    })
  },B.loadCssOverride = function (){
    void 0 === t ? B.allShow() : Xe(t,`window.commento.allShow()`)
  },B.allShow = function (){
    var e = Me(m),o = Me(d),n = Me(f); Ie(e,`style`,``),ve && Ie(o,`style`,``),n && Ie(n,`style`,``)
  },B.loginBoxClose = function (){
    var e = Me(m),o = Me(T); Ee(e,`blurred`),Ee(ce,`root-min-height`),Ie(o,`style`,`display: none`)
  },B.loginBoxShow = function (e){
    var o = Me(m),n = Me(T); B.popupRender(e),De(o,`blurred`),Ie(n,`style`,``),window.location.hash = T,Me(L).focus()
  }; var go = !(B.main = function (e){
    if (null !== (ce = Me(c))){
      null === Le && (Le = ce.getBoundingClientRect().width < 450),De(ce,`root`),`true` !== r && De(ce,`root-font`),function (){
        var e = Ae(`div`); e.id = T,Ne(ce,e)
      }(),function (){
        var e = Ae(`div`); e.id = s,De(e,`error-box`),Ie(e,`style`,`display: none;`),Ne(ce,e)
      }(),function (){
        var e = Ae(`div`); e.id = m,De(e,`main-area`),Ie(e,`style`,`display: none`),Ne(ce,e)
      }(); var o = function (){
        var e = Ae(`div`),o = Ae(`div`),n = Ae(`a`),t = Ae(`span`); return e.id = `commento-footer`,De(e,`footer`),De(o,`logo-container`),De(n,`logo`),De(t,`logo-text`),Ie(n,`href`,`https://commento.io`),Ie(n,`target`,`_blank`),t.innerText = `Commento`,Ne(n,t),Ne(o,n),Ne(e,o),e
      }(); Xe(`https://hackersandslackers.com/css/commento.css`,`window.commento.loadCssOverride()`),Ve(function (){
        ze(function (){
          !function (){
            var e = Ae(`div`),o = Ae(`button`); e.id = d,o.id = n,De(e,`mod-tools`),o.innerHTML = ge ? `Unlock Thread` : `Lock Thread`,Ue(o,B.threadLockToggle),Ie(e,`style`,`display: none`),Ne(e,o),Ne(ce,e)
          }(),no(function (){
            uo(),Ne(ce,o),function (){
              if (window.location.hash) {
                if (window.location.hash.startsWith(`#commento-`)){
                  var e = Me(I + window.location.hash.split(`-`)[1]); if (null === e) {
                    return
                  } De(e,`highlighted-card`),e.scrollIntoView(!0)
                } else {
                  window.location.hash.startsWith(`#commento`) && ce.scrollIntoView(!0)
                }
              }
            }(),B.allShow(),function (){
              for (var e = i.getElementsByClassName(`commento-name`),o = 0; o < e.length; o++){
                Ie(e[o],`style`,`max-width: ` + (e[o].getBoundingClientRect().width + 20) + `px;`)
              }
            }(),je(e)
          })
        })
      })
    } else {
      console.log(`[commento] error: no root element with ID '` + c + `' found`)
    }
  }); function xo(){
    go || (go = !0,e(),`true` === a || void 0 === a ? B.main(void 0) : `false` !== a && console.log(`[commento] error: invalid value for data-auto-init; allowed values: true, false`))
  } var bo = function (){
    var e = i.readyState; `loading` === e ? i.addEventListener(`readystatechange`,bo) : `interactive` === e ? xo() : `complete` === e && xo()
  }; bo()
}(window.commento,document)
