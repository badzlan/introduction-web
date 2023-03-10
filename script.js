/**
 * @author monkindey
 */

 "use strict";

 !(function () {
   var aboutMe = document.getElementById("about-me");
   // var color = ['#0e96a2', '#67a61c', '#fff', '#fff', '#fff'];
   var color = ["#fff", "#fff", "#fff"];
   var charactor = "";
 
   function getCharColor(charactor) {
     var index = parseInt(Math.random() * color.length) - 1;
     return '<span style="color:' + color[index] + '">' + charactor + "</span>";
   }
 
   // 简单的promise
   var Promise = function () {
     this.thens = [];
   };
 
   Promise.prototype.then = function (next) {
     this.thens.push(next);
     return this;
   };
 
   Promise.prototype.resolve = function () {
     var next = this.thens.shift();
 
     if (next) {
       var defer = next.call(null, arguments);
       defer instanceof Promise && (defer.thens = this.thens);
     }
   };
 
   // 函数科里化
   var step = function (opts) {
     opts = opts || {};
     var cmd = opts.cmd || "";
     var cwd = opts.cwd || "";
     var cb = opts.cb;
     var chars = cmd.split("");
 
     if (cwd) {
       chars.unshift(cwd);
     }
 
     return function () {
       var defer = new Promise();
       var containEl = document.createElement(opts.containEl || "p");
       containEl.className = opts.cls || "line";
       aboutMe.appendChild(containEl);
 
       // requestAnimationFrame
       setTimeout(function type() {
         if (chars.length !== 0) {
           charactor = chars.shift();
           // aboutMe.innerHTML += getCharColor(charactor);
           containEl.innerHTML += charactor;
           setTimeout(type, 100);
         } else {
           cb && cb();
           defer.resolve();
         }
       }, 100);
       return defer;
     };
   };
 
   var step1 = step({
     cwd: "~ /home/bdzln/ ",
     cmd: " whoami",
     cls: "",
   });
 
   var step2 = step({
     cmd: "My name is Badzlan Nur Dhabith, I live in Jakarta, Indonesia.",
     cls: "result line",
   });
   
   var step3 = step({
     cmd: "I am an Application Network Information System student, from SMKN 69 Jakarta.",
     cls: "result line",
   });
 
   var step4 = step({
     cwd: "~ /home/bdzln/",
     cmd: " cd hobby",
   });
 
   var step5 = step({
     cwd: "~ /home/bdzln/hobby/ ",
     cmd: " ls",
   });
 
   var step6 = step({
     cmd: "music",
     cls: "result line",
   });
 
   var step7 = step({
     cmd: "coding",
     cls: "result line",
   });
 
   var step8 = step({
     cwd: "~ /home/bdzln/hobby/ ",
     cmd: "cd coding",
   });
 
   var step9 = step({
     cwd: "~ /home/bdzln/hobby/coding/ ",
     cmd: "ls",
   });
 
   var step10 = step({
     cmd: "github",
     cls: "result line",
   });
 
   var step11 = step({
     cwd: "~ /home/bdzln/hobby/coding/ ",
     cmd: "program start github",
   });
 
   var step12 = step({
     cmd: "opening...",
     cb: function () {
       if (confirm("Will you take a look at my github ?")) {
         window.location.href = "https://github.com/badzlan";
       }
     },
   });
 
   step1()
     .then(step2)
     .then(step3)
     .then(step4)
     .then(step5)
     .then(step6)
     .then(step7)
     .then(step8)
     .then(step9)
     .then(step10)
     .then(step11)
     .then(step12);
 })();