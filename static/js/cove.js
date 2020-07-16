var coveUrl = `https://app.cove.chat/`,css = `\n.cove-input,.cove-button{font-size:inherit;appearance:none;-moz-appearance:none;-webkit-appearance:none;}\n.cove-input{border:1px solid #aaa;outline:none;border-radius:2px;padding:4px 10px;line-height:2;vertical-align:middle}\n.cove-input:focus{border-color:#777;outline:none;box-shadow:0px 0px 4px rgba(0,0,0,0.16)}\n.cove-button{cursor:pointer;text-align:center;outline:none;background-color:#111;border: 1px solid #111;color:#fff;border-radius:2px;padding:4px 10px;line-height:2;vertical-align:middle}\n#cove-login .signin-success,#cove-login .signin-error{display:none}\n#cove-login.success .signin-success{display:block !important;color:green}\n#cove-login.error .signin-error{display:block !important;color:red}\n#cove-login.loading .button-spinner{display:block !important;}\n#cove-login .button-spinner svg {margin:auto}\n#cove-login.loading .button-text{display:none}\n`,customCss = document.createElement(`style`); customCss.id = `cove-style`,customCss.appendChild(document.createTextNode(css)),document.getElementsByTagName(`head`)[0].appendChild(customCss); var spinnerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#ccc" stroke-width="12" r="39" stroke-dasharray="183.7831702350029 63.261056745000964" transform="rotate(197.992 50 50)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"/></circle></svg>`,reactionIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none" stroke="#aaa" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"><path d="M15.22 6c.179-.53.28-1.035.28-1.5a4 4 0 00-4-4C9.982.5 8.678 1.355 8 2.601 7.322 1.355 6.018.5 4.5.5a4 4 0 00-4 4c0 2.453 2.821 6.035 5.003 8.438"/><circle cx="11.5" cy="11.5" r="4"/><path d="M11.5 9.5v4M9.5 11.5h4"/></g></svg>`; function getParameterByName(e,t){
  t || (t = window.location.href),e = e.replace(/[\[\]]/g,`\\$&`); var n = new RegExp(`[?&]` + e + `(=([^&#]*)|&|#|$)`).exec(t); return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g,` `)) : `` : null
} var coveAction = getParameterByName(`action`),commentForm,nameInput,commentInput,commentBlock,commentsCount,replyInput,cancelLink,commentTemplate,hasReactions,reactionTypes; if (`signin` == coveAction && localStorage.coveLoginRedirect){
  let e = localStorage.coveLoginRedirect; localStorage.removeItem(`coveLoginRedirect`),window.location.href = e.replace(`#cove-comments`,``) + `#cove-comments`
} var container = document.getElementById(`cove`),coveCommentCount = document.getElementById(`cove-count`),loadingMessage = document.createElement(`div`); if (null !== container){
  container.appendChild(loadingMessage); var newMessageAlert = document.createElement(`div`); newMessageAlert.innerHTML = ``,newMessageAlert.setAttribute(`style`,`display:none`),newMessageAlert.setAttribute(`id`,`cove-new-alert`),container.appendChild(newMessageAlert),newMessageAlert.addEventListener(`click`,function (e){
    getComments()
  })
} async function getComments(){
  let e = coveUrl + Cove.publication + `/api/comments/?contentId=` + Cove.contentId + (`` !== Cove.memberId ? `&member=` + Cove.memberId + `|` + encodeURIComponent(Cove.memberEmail) : ``),t = await fetch(e),n = await t.json(); if (`` === n.error){
    reactionTypes = n.reaction_types,hasReactions = n.has_reactions,loadingMessage.setAttribute(`style`,`display:none`),commentBlock.innerHTML = ``; var o = customCss.innerHTML + n.css; customCss.innerHTML = o,commentTemplate = n.template_html,newMessageAlert.innerHTML = spinnerSvg,comments = n.comments,commentsCount = comments.length,null !== coveCommentCount && (coveCommentCount.innerHTML = commentsCount),comments.forEach((e,t) => {
      addComment(e)
    }),`` == Cove.memberId && Array.from(document.getElementsByClassName(`cove-reply`)).forEach(function (e){
      e.innerHTML = `Sign in to reply`
    }),void 0 === commentForm && addForm(n.member); var a = document.createElement(`div`); a.setAttribute(`style`,`text-align:right;font-size:12px`),a.innerHTML = `Powered by <a href="https://cove.chat" target="_blank">Cove</a>`,container.parentNode.insertBefore(a,container.nextSibling),listenForReplies(),listenForLikes(),listenForReactions(),newMessageAlert.setAttribute(`style`,`display:none`),newMessageAlert.innerHTML = ``
  } else {
    container.innerHTML = n.error
  }
} async function pollForUpdates(){
  let e = coveUrl + Cove.publication + `/api/comments/?contentId=` + Cove.contentId + `&count=` + commentsCount,t = await fetch(e),n = await t.json(); if (n.count > commentsCount){
    let e = n.count - commentsCount; if (1 == e) {
      var o = `is`,a = ``
    } else {
      o = `are`,a = `s`
    }newMessageAlert.setAttribute(`style`,`display:block`),newMessageAlert.innerHTML = `There ${o} ${e} new message${a}. Click here to refresh.`
  }
} function listenForReplies(){
  let e = document.getElementsByClassName(`cove-reply`); Array.from(e).forEach(function (e){
    e.addEventListener(`click`,activateReply)
  })
} function listenForLikes(){
  let e = document.getElementsByClassName(`cove-like`); Array.from(e).forEach(function (e){
    e.addEventListener(`click`,toggleLike)
  })
} function listenForReactions(){
  let e = document.querySelectorAll(`[data-cove-emoji]`); Array.from(e).forEach(function (e){
    e.addEventListener(`click`,submitReaction)
  })
} function coveInit(){
  if ((commentBlock = document.createElement(`div`)).setAttribute(`id`,`cove-comments`),container.appendChild(commentBlock),loadingMessage.innerHTML = spinnerSvg + `&nbsp; Loading...`,getComments(),void 0 !== window.event){
    let e = window.event.target; e.parentElement.removeChild(e)
  }
} function addForm(e){
  if (Cove.memberId){
    (commentForm = document.createElement(`form`)).id = `cove-form`,(commentInput = document.createElement(`textarea`)).className = `cove-input`,commentInput.setAttribute(`name`,`body`),commentInput.setAttribute(`placeholder`,0 == commentsCount ? `Leave the first comment!` : `Leave your comment...`),commentInput.setAttribute(`required`,!0),commentInput.setAttribute(`rows`,1),commentInput.id = `cove-input-body`,commentInput.setAttribute(`onkeyup`,`adjustTextarea(this)`),commentForm.appendChild(commentInput),null == e.name && ((nameInput = document.createElement(`input`)).className = `cove-input`,nameInput.setAttribute(`name`,`member_name`),nameInput.setAttribute(`placeholder`,`Your name`),nameInput.setAttribute(`required`,!0),nameInput.id = `cove-input-name`,commentForm.appendChild(nameInput)); var t = document.createElement(`button`); t.className = `cove-button`,t.id = `cove-submit`; var n = document.createElement(`span`); n.innerHTML = `Post`; var o = document.createElement(`span`); o.style = `display:none`,o.innerHTML = spinnerSvg,t.appendChild(n),t.appendChild(o),memberIdInput = document.createElement(`input`),memberIdInput.setAttribute(`name`,`member_id`),memberIdInput.setAttribute(`type`,`hidden`),memberIdInput.value = Cove.memberId,(replyInput = document.createElement(`input`)).setAttribute(`name`,`reply_id`),replyInput.setAttribute(`type`,`hidden`),commentForm.appendChild(t),commentForm.appendChild(memberIdInput),commentForm.appendChild(replyInput),container.appendChild(commentForm),commentForm.addEventListener(`submit`,function (e){
      e.preventDefault(),submitComment()
    })
  }
} function addComment(e){
  let t = document.createElement(`div`); t.setAttribute(`class`,`cove-comment`),t.setAttribute(`data-cove-id`,e.uuid),t.id = `cove-` + e.uuid,t.innerHTML = getCommentHTML(e),showReactions(t,e.reactions,e.member_reaction),e.parent ? (parentList = document.querySelectorAll(`[data-cove-id='${e.parent}']`),parentList[0].appendChild(t)) : commentBlock.appendChild(t)
} function showReactions(e,t,n){
  let o = e.getElementsByClassName(`cove-reactor`)[0]; if (o.innerHTML = ``,`off` != hasReactions) {
    if (o.appendChild(document.createTextNode(` â€¢`)),`likes` == hasReactions){
      for (var a in t) {
        if (t.hasOwnProperty(a)){
          let e = document.createElement(`span`); e.className = `cove-like` + (`heart` == n ? ` active` : ``),e.innerHTML = a + ` ` + t[a],o.appendChild(e)
        }
      }
    } else if (`emoji` == hasReactions){
      for (var a in o.appendChild(document.createTextNode(` `)),t) {
        if (t.hasOwnProperty(a)){
          let e = document.createElement(`span`); e.className = `cove-reaction` + (n == a ? ` active` : ``),e.innerHTML = a + ` ` + t[a],o.appendChild(e)
        }
      }let e = document.createElement(`span`); e.className = `cove-reaction-box`; let r = document.createElement(`span`); if (r.className = `cove-reaction-button`,r.innerHTML = reactionIcon,e.appendChild(r),`` != Cove.memberId){
        var c = ``; for (var i in reactionTypes){
          reactionTypes.hasOwnProperty(i) && (c += `<span data-cove-emoji="${i}">${reactionTypes[i]}</span>`)
        }let t = document.createElement(`div`); t.className = `cove-reaction-menu`,t.innerHTML = c,e.appendChild(t)
      }o.appendChild(e)
    }
  }
} async function submitComment(){
  nameMessage = document.getElementById(`cove-name-message`),nameMessage && nameMessage.parentElement.removeChild(nameMessage); let e = coveUrl + Cove.publication + `/api/comments/` + Cove.contentId + `/`; const t = new FormData(commentForm); let n = await fetch(e,{ method: `POST`,body: t }),o = await n.json(); if (`` != o.error){
    let e = document.createElement(`div`); e.id = `cove-name-message`,e.innerHTML = o.error,commentForm.parentNode.insertBefore(e,commentForm.nextSibling)
  } else {
    addComment(o.comment),commentInput.setAttribute(`placeholder`,`Leave your comment...`),commentsCount = o.total_count,null !== coveCommentCount && (coveCommentCount.innerHTML = commentsCount),commentInput.setAttribute(`rows`,1),removeCancelLink(),listenForReplies(),listenForLikes(),listenForReactions(),container.appendChild(commentForm),commentInput.value = ``,void 0 !== nameInput && nameInput.parentElement.removeChild(nameInput),replyInput.value = ``
  }
} function getCommentHTML(comment){
  return eval(`\`` + commentTemplate + `\``)
} function activateReply(e){
  if (e.preventDefault(),`` == Cove.memberId) {
    return
  } Array.from(document.getElementsByClassName(`cove-cancel`)).forEach(function (e){
    e.parentElement.removeChild(e)
  }); let t = e.target.closest(`.cove-comment`); t.parentElement.className.indexOf(`cove-comment`) > -1 ? parentComment = t.parentElement : parentComment = t,parentComment.appendChild(commentForm),checkVisible(commentForm) || commentForm.scrollIntoView(!1),commentInput.focus(),(cancelLink = document.createElement(`a`)).href = `#`,cancelLink.className = `cove-cancel`,cancelLink.innerHTML = `Cancel reply`,parentComment.appendChild(cancelLink),replyInput.setAttribute(`value`,t.getAttribute(`data-cove-id`)),cancelLink.addEventListener(`click`,cancelReply)
} function checkVisible(e){
  var t = e.getBoundingClientRect(),n = Math.max(document.documentElement.clientHeight,window.innerHeight); return !(t.bottom < 0 || t.top - n >= 0)
} function cancelReply(e){
  e.preventDefault(),removeCancelLink(),container.appendChild(commentForm),commentInput.value = ``,replyInput.value = ``,listenForReplies()
} function removeCancelLink(){
  void 0 !== cancelLink && (cancelLink.removeEventListener(`click`,cancelReply),cancelLink.parentElement.removeChild(cancelLink))
} async function toggleLike(e){
  e.preventDefault(); let t = e.target.closest(`.cove-like`),n = t.closest(`.cove-comment`),o = n.getAttribute(`data-cove-id`),a = (t.className.indexOf(`active`),coveUrl + Cove.publication + `/api/reactions/` + o + `/`),c = await fetch(a,{ method: `POST`,body: JSON.stringify({ member_id: Cove.memberId,reaction: `heart` }) }),i = await c.json(); `` != i.error || (showReactions(n,i.reactions,i.member_reaction),listenForLikes())
} async function submitReaction(e){
  e.preventDefault(); let t = e.target.closest(`[data-cove-emoji]`),n = t.closest(`.cove-comment`),o = n.getAttribute(`data-cove-id`),a = t.getAttribute(`data-cove-emoji`),c = coveUrl + Cove.publication + `/api/reactions/` + o + `/`,i = await fetch(c,{ method: `POST`,body: JSON.stringify({ member_id: Cove.memberId,reaction: a }) }),r = await i.json(); `` != r.error || (showReactions(n,r.reactions,r.member_reaction),listenForReactions())
}`undefined` !== typeof Cove && !1 !== Cove.autoLoad && coveInit(); var loginForm = document.getElementById(`cove-login`); function adjustTextarea(e){
  var t = e.value,n = (t = (t = t.replace(new RegExp(`\n\r`,`gi`),`\n`)).replace(new RegExp(`\r`,`gi`),`\n`)).split(`\n`); e.rows = n.length
}null !== loginForm && loginForm.addEventListener(`submit`,function (e){
  localStorage.coveLoginRedirect = window.location.href.replace(window.location.search,``)
})
