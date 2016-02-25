!function(a){function b(a){return Math.max(0,Math.round(100*Math.pow(2,a/6))/100)}function c(a,b){var c,d,e=0,f=0,g=0,h=0;return c=a.toExponential().match(/^.\.?(.*)e(.+)$/),e=parseInt(c[2],10)-(c[1]+"").length,c=b.toExponential().match(/^.\.?(.*)e(.+)$/),f=parseInt(c[2],10)-(c[1]+"").length,f>e&&(e=f),d=a%b,-100>e||e>20?(g=Math.round(Math.log(d)/Math.log(10)),h=Math.pow(10,g),(d/h).toFixed(g-e)*h):parseFloat(d.toFixed(-e))}function d(a){return 0===a?1:Math.abs(a)/a}function e(a){return(Math.exp(a)-Math.exp(-a))/(Math.exp(a)+Math.exp(-a))}var f,g,h=function(b){a.AudioContext||(a.AudioContext=a.webkitAudioContext),b||(console.log("tuna.js: Missing audio context! Creating a new context for you."),b=a.AudioContext&&new a.AudioContext),f=b,g=this},i="0.1",j="setValueAtTime",k="linearRampToValueAtTime",l=function(a,b){a.value=b},m=Object.create(null,{activate:{writable:!0,value:function(a){a?(this.input.disconnect(),this.input.connect(this.activateNode),this.activateCallback&&this.activateCallback(a)):(this.input.disconnect(),this.input.connect(this.output))}},bypass:{get:function(){return this._bypass},set:function(a){this._lastBypassValue!==a&&(this._bypass=a,this.activate(!a),this._lastBypassValue=a)}},connect:{value:function(a){this.output.connect(a)}},disconnect:{value:function(a){this.output.disconnect(a)}},connectInOrder:{value:function(a){for(var b=a.length-1;b--;){if(!a[b].connect)return console.error("AudioNode.connectInOrder: TypeError: Not an AudioNode.",a[b]);a[b+1].input?a[b].connect(a[b+1].input):a[b].connect(a[b+1])}}},getDefaults:{value:function(){var a={};for(var b in this.defaults)a[b]=this.defaults[b].value;return a}},getValues:{value:function(){var a={};for(var b in this.defaults)a[b]=this[b];return a}},automate:{value:function(a,b,c,d){var e,g=d?~~(d/1e3):f.currentTime,h=c?~~(c/1e3):0,i=this.defaults[a],l=this[a];l?i.automatable?(c?(e=k,l.cancelScheduledValues(g),l.setValueAtTime(l.value,g)):e=j,l[e](b,h+g)):l=b:console.error("Invalid Property for "+this.name)}}}),n="float",o="boolean",p="int";h.toString=h.prototype.toString=function(){return"You are running Tuna version "+i+" by Dinahmoe!"},h.prototype.Filter=function(a){a||(a=this.getDefaults()),this.input=f.createGain(),this.activateNode=f.createGain(),this.filter=f.createBiquadFilter(),this.output=f.createGain(),this.activateNode.connect(this.filter),this.filter.connect(this.output),this.frequency=a.frequency||this.defaults.frequency.value,this.Q=a.resonance||this.defaults.Q.value,this.filterType=a.filterType||this.defaults.filterType.value,this.gain=a.gain||this.defaults.gain.value,this.bypass=a.bypass||!1},h.prototype.Filter.prototype=Object.create(m,{name:{value:"Filter"},defaults:{writable:!0,value:{frequency:{value:800,min:20,max:22050,automatable:!0},Q:{value:1,min:.001,max:100,automatable:!0},gain:{value:0,min:-40,max:40,automatable:!0},bypass:{value:!0,automatable:!1,type:o},filterType:{value:1,min:0,max:7,automatable:!1,type:p}}},filterType:{enumerable:!0,get:function(){return this.filter.type},set:function(a){this.filter.type=a}},Q:{enumerable:!0,get:function(){return this.filter.Q},set:function(a){this.filter.Q.value=a}},gain:{enumerable:!0,get:function(){return this.filter.gain},set:function(a){this.filter.gain.value=a}},frequency:{enumerable:!0,get:function(){return this.filter.frequency},set:function(a){this.filter.frequency.value=a}}}),h.prototype.Bitcrusher=function(a){a||(a=this.getDefaults()),this.bufferSize=a.bufferSize||this.defaults.bufferSize.value,this.input=f.createGain(),this.activateNode=f.createGain(),this.processor=f.createScriptProcessor(this.bufferSize,1,1),this.output=f.createGain(),this.activateNode.connect(this.processor),this.processor.connect(this.output);var b=0,c=0;this.processor.onaudioprocess=function(a){for(var d=a.inputBuffer.getChannelData(0),e=a.outputBuffer.getChannelData(0),f=Math.pow(.5,this.bits),g=0;g<d.length;g++)b+=this.normfreq,b>=1&&(b-=1,c=f*Math.floor(d[g]/f+.5)),e[g]=c},this.bits=a.bits||this.defaults.bits.value,this.normfreq=a.normfreq||this.defaults.normfreq.value,this.bypass=a.bypass||!1},h.prototype.Bitcrusher.prototype=Object.create(m,{name:{value:"Bitcrusher"},defaults:{writable:!0,value:{bits:{value:4,min:1,max:16,automatable:!1,type:p},bufferSize:{value:4096,min:256,max:16384,automatable:!1,type:p},bypass:{value:!1,automatable:!1,type:o},normfreq:{value:.1,min:1e-4,max:1,automatable:!1}}},bits:{enumerable:!0,get:function(){return this.processor.bits},set:function(a){this.processor.bits=a}},normfreq:{enumerable:!0,get:function(){return this.processor.normfreq},set:function(a){this.processor.normfreq=a}}}),h.prototype.Cabinet=function(a){a||(a=this.getDefaults()),this.input=f.createGain(),this.activateNode=f.createGain(),this.convolver=this.newConvolver(a.impulsePath||"../impulses/impulse_guitar.wav"),this.makeupNode=f.createGain(),this.output=f.createGain(),this.activateNode.connect(this.convolver.input),this.convolver.output.connect(this.makeupNode),this.makeupNode.connect(this.output),this.makeupGain=a.makeupGain||this.defaults.makeupGain,this.bypass=a.bypass||!1},h.prototype.Cabinet.prototype=Object.create(m,{name:{value:"Cabinet"},defaults:{writable:!0,value:{makeupGain:{value:1,min:0,max:20,automatable:!0},bypass:{value:!1,automatable:!1,type:o}}},makeupGain:{enumerable:!0,get:function(){return this.makeupNode.gain},set:function(a){this.makeupNode.gain.value=a}},newConvolver:{value:function(a){return new g.Convolver({impulse:a,dryLevel:0,wetLevel:1})}}}),h.prototype.Chorus=function(a){a||(a=this.getDefaults()),this.input=f.createGain(),this.attenuator=this.activateNode=f.createGain(),this.splitter=f.createChannelSplitter(2),this.delayL=f.createDelayNode(),this.delayR=f.createDelayNode(),this.feedbackGainNodeLR=f.createGain(),this.feedbackGainNodeRL=f.createGain(),this.merger=f.createChannelMerger(2),this.output=f.createGain(),this.lfoL=new g.LFO({target:this.delayL.delayTime,callback:l}),this.lfoR=new g.LFO({target:this.delayR.delayTime,callback:l}),this.input.connect(this.attenuator),this.attenuator.connect(this.output),this.attenuator.connect(this.splitter),this.splitter.connect(this.delayL,0),this.splitter.connect(this.delayR,1),this.delayL.connect(this.feedbackGainNodeLR),this.delayR.connect(this.feedbackGainNodeRL),this.feedbackGainNodeLR.connect(this.delayR),this.feedbackGainNodeRL.connect(this.delayL),this.delayL.connect(this.merger,0,0),this.delayR.connect(this.merger,0,1),this.merger.connect(this.output),this.feedback=a.feedback||this.defaults.feedback.value,this.rate=a.rate||this.defaults.rate.value,this.delay=a.delay||this.defaults.delay.value,this.depth=a.depth||this.defaults.depth.value,this.lfoR.phase=Math.PI/2,this.attenuator.gain.value=.6934,this.lfoL.activate(!0),this.lfoR.activate(!0),this.bypass=a.bypass||!1},h.prototype.Chorus.prototype=Object.create(m,{name:{value:"Chorus"},defaults:{writable:!0,value:{feedback:{value:.4,min:0,max:.95,automatable:!1},delay:{value:.0045,min:0,max:1,automatable:!1},depth:{value:.7,min:0,max:1,automatable:!1},rate:{value:1.5,min:0,max:8,automatable:!1},bypass:{value:!0,automatable:!1,type:o}}},delay:{enumerable:!0,get:function(){return this._delay},set:function(a){this._delay=4e-4*Math.pow(10,a),this.lfoL.offset=this._delay,this.lfoR.offset=this._delay,this._depth=this._depth}},depth:{enumerable:!0,get:function(){return this._depth},set:function(a){this._depth=a,this.lfoL.oscillation=this._depth*this._delay,this.lfoR.oscillation=this._depth*this._delay}},feedback:{enumerable:!0,get:function(){return this._feedback},set:function(a){this._feedback=a,this.feedbackGainNodeLR.gain.value=this._feedback,this.feedbackGainNodeRL.gain.value=this._feedback}},rate:{enumerable:!0,get:function(){return this._rate},set:function(a){this._rate=a,this.lfoL.frequency=this._rate,this.lfoR.frequency=this._rate}}}),h.prototype.Compressor=function(a){a||(a=this.getDefaults()),this.input=f.createGain(),this.compNode=this.activateNode=f.createDynamicsCompressor(),this.makeupNode=f.createGain(),this.output=f.createGain(),this.compNode.connect(this.makeupNode),this.makeupNode.connect(this.output),this.automakeup=a.automakeup||this.defaults.automakeup.value,this.makeupGain=a.makeupGain||this.defaults.makeupGain.value,this.threshold=a.threshold||this.defaults.threshold.value,this.release=a.release||this.defaults.release.value,this.attack=a.attack||this.defaults.attack.value,this.ratio=a.ratio||this.defaults.ratio.value,this.knee=a.knee||this.defaults.knee.value,this.bypass=a.bypass||!1},h.prototype.Compressor.prototype=Object.create(m,{name:{value:"Compressor"},defaults:{writable:!0,value:{threshold:{value:-20,min:-60,max:0,automatable:!0},release:{value:250,min:10,max:2e3,automatable:!0},makeupGain:{value:1,min:1,max:100,automatable:!0},attack:{value:1,min:0,max:1e3,automatable:!0},ratio:{value:4,min:1,max:50,automatable:!0},knee:{value:5,min:0,max:40,automatable:!0},automakeup:{value:!1,automatable:!1,type:o},bypass:{value:!0,automatable:!1,type:o}}},computeMakeup:{value:function(){var a=4,b=this.compNode;return-(b.threshold.value-b.threshold.value/b.ratio.value)/a}},automakeup:{enumerable:!0,get:function(){return this._automakeup},set:function(a){this._automakeup=a,this._automakeup&&(this.makeupGain=this.computeMakeup())}},threshold:{enumerable:!0,get:function(){return this.compNode.threshold},set:function(a){this.compNode.threshold.value=a,this._automakeup&&(this.makeupGain=this.computeMakeup())}},ratio:{enumerable:!0,get:function(){return this.compNode.ratio},set:function(a){this.compNode.ratio.value=a,this._automakeup&&(this.makeupGain=this.computeMakeup())}},knee:{enumerable:!0,get:function(){return this.compNode.knee},set:function(a){this.compNode.knee.value=a,this._automakeup&&(this.makeupGain=this.computeMakeup())}},attack:{enumerable:!0,get:function(){return this.compNode.attack},set:function(a){this.compNode.attack.value=a/1e3}},release:{enumerable:!0,get:function(){return this.compNode.release},set:function(a){this.compNode.release=a/1e3}},makeupGain:{enumerable:!0,get:function(){return this.makeupNode.gain},set:function(a){this.makeupNode.gain.value=b(a)}}}),h.prototype.Convolver=function(a){a||(a=this.getDefaults()),this.input=f.createGain(),this.activateNode=f.createGain(),this.convolver=f.createConvolver(),this.dry=f.createGain(),this.filterLow=f.createBiquadFilter(),this.filterHigh=f.createBiquadFilter(),this.wet=f.createGain(),this.output=f.createGain(),this.activateNode.connect(this.filterLow),this.activateNode.connect(this.dry),this.filterLow.connect(this.filterHigh),this.filterHigh.connect(this.convolver),this.convolver.connect(this.wet),this.wet.connect(this.output),this.dry.connect(this.output),this.dryLevel=a.dryLevel||this.defaults.dryLevel.value,this.wetLevel=a.wetLevel||this.defaults.wetLevel.value,this.highCut=a.highCut||this.defaults.highCut.value,this.buffer=a.impulse||"../impulses/ir_rev_short.wav",this.lowCut=a.lowCut||this.defaults.lowCut.value,this.level=a.level||this.defaults.level.value,this.filterHigh.type=this.filterHigh.LOWPASS,this.filterLow.type=this.filterHigh.HIGHPASS,this.bypass=a.bypass||!1},h.prototype.Convolver.prototype=Object.create(m,{name:{value:"Convolver"},defaults:{writable:!0,value:{highCut:{value:22050,min:20,max:22050,automatable:!0},lowCut:{value:20,min:20,max:22050,automatable:!0},dryLevel:{value:1,min:0,max:1,automatable:!0},wetLevel:{value:1,min:0,max:1,automatable:!0},level:{value:1,min:0,max:1,automatable:!0}}},lowCut:{get:function(){return this.filterLow.frequency},set:function(a){this.filterLow.frequency.value=a}},highCut:{get:function(){return this.filterHigh.frequency},set:function(a){this.filterHigh.frequency.value=a}},level:{get:function(){return this.output.gain},set:function(a){this.output.gain.value=a}},dryLevel:{get:function(){return this.dry.gain},set:function(a){this.dry.gain.value=a}},wetLevel:{get:function(){return this.wet.gain},set:function(a){this.wet.gain.value=a}},buffer:{enumerable:!1,get:function(){return this.convolver.buffer},set:function(a){var b=this.convolver,c=new XMLHttpRequest;return a?(c.open("GET",a,!0),c.responseType="arraybuffer",c.onreadystatechange=function(){4===c.readyState&&(c.status<300&&c.status>199||302===c.status)&&f.decodeAudioData(c.response,function(a){b.buffer=a},function(a){a&&console.log("Tuna.Convolver.setBuffer: Error decoding data"+a)})},void c.send(null)):void console.log("Tuna.Convolver.setBuffer: Missing impulse path!")}}}),h.prototype.Delay=function(a){a||(a=this.getDefaults()),this.input=f.createGain(),this.activateNode=f.createGain(),this.dry=f.createGain(),this.wet=f.createGain(),this.filter=f.createBiquadFilter(),this.delay=f.createDelayNode(),this.feedbackNode=f.createGain(),this.output=f.createGain(),this.activateNode.connect(this.delay),this.activateNode.connect(this.dry),this.delay.connect(this.filter),this.filter.connect(this.feedbackNode),this.feedbackNode.connect(this.delay),this.feedbackNode.connect(this.wet),this.wet.connect(this.output),this.dry.connect(this.output),this.delayTime=a.delayTime||this.defaults.delayTime.value,this.feedback=a.feedback||this.defaults.feedback.value,this.wetLevel=a.wetLevel||this.defaults.wetLevel.value,this.dryLevel=a.dryLevel||this.defaults.dryLevel.value,this.cutoff=a.cutoff||this.defaults.cutoff.value,this.filter.type=this.filter.LOWPASS,this.bypass=a.bypass||!1},h.prototype.Delay.prototype=Object.create(m,{name:{value:"Delay"},defaults:{writable:!0,value:{delayTime:{value:100,min:20,max:1e3,automatable:!1},feedback:{value:.45,min:0,max:.9,automatable:!0},cutoff:{value:2e4,min:20,max:2e4,automatable:!0},wetLevel:{value:.5,min:0,max:1,automatable:!0},dryLevel:{value:1,min:0,max:1,automatable:!0}}},delayTime:{enumerable:!0,get:function(){return this.delay.delayTime},set:function(a){this.delay.delayTime.value=a/1e3}},wetLevel:{enumerable:!0,get:function(){return this.wet.gain},set:function(a){this.wet.gain.value=a}},dryLevel:{enumerable:!0,get:function(){return this.dry.gain},set:function(a){this.dry.gain.value=a}},feedback:{enumerable:!0,get:function(){return this.feedbackNode.gain},set:function(a){this.feedbackNode.gain.value=a}},cutoff:{enumerable:!0,get:function(){return this.filter.frequency},set:function(a){this.filter.frequency.value=a}}}),h.prototype.MoogFilter=function(a){a||(a=this.getDefaults()),this.bufferSize=a.bufferSize||this.defaults.bufferSize.value,this.input=f.createGain(),this.activateNode=f.createGain(),this.processor=f.createScriptProcessor(this.bufferSize,1,1),this.output=f.createGain(),this.activateNode.connect(this.processor),this.processor.connect(this.output);var b,c,d,e,g,h,i,j;b=c=d=e=g=h=i=j=0,this.processor.onaudioprocess=function(a){for(var f=a.inputBuffer.getChannelData(0),k=a.outputBuffer.getChannelData(0),l=1.16*this.cutoff,m=this.resonance*(1-.15*l*l),n=0;n<f.length;n++)f[n]-=j*m,f[n]*=.35013*l*l*l*l,g=f[n]+.3*b+(1-l)*g,b=f[n],h=g+.3*c+(1-l)*h,c=g,i=h+.3*d+(1-l)*i,d=h,j=i+.3*e+(1-l)*j,e=i,k[n]=j},this.cutoff=a.cutoff||this.defaults.cutoff.value,this.resonance=a.resonance||this.defaults.resonance.value,this.bypass=a.bypass||!1},h.prototype.MoogFilter.prototype=Object.create(m,{name:{value:"MoogFilter"},defaults:{writable:!0,value:{bufferSize:{value:4096,min:256,max:16384,automatable:!1,type:p},bypass:{value:!1,automatable:!1,type:o},cutoff:{value:.065,min:1e-4,max:1,automatable:!1},resonance:{value:3.5,min:0,max:4,automatable:!1}}},cutoff:{enumerable:!0,get:function(){return this.processor.cutoff},set:function(a){this.processor.cutoff=a}},resonance:{enumerable:!0,get:function(){return this.processor.resonance},set:function(a){this.processor.resonance=a}}}),h.prototype.Overdrive=function(a){a||(a=this.getDefaults()),this.input=f.createGain(),this.activateNode=f.createGain(),this.inputDrive=f.createGain(),this.waveshaper=f.createWaveShaper(),this.outputDrive=f.createGain(),this.output=f.createGain(),this.activateNode.connect(this.inputDrive),this.inputDrive.connect(this.waveshaper),this.waveshaper.connect(this.outputDrive),this.outputDrive.connect(this.output),this.ws_table=new Float32Array(this.k_nSamples),this.drive=a.drive||this.defaults.drive.value,this.outputGain=a.outputGain||this.defaults.outputGain.value,this.curveAmount=a.curveAmount||this.defaults.curveAmount.value,this.algorithmIndex=a.algorithmIndex||this.defaults.algorithmIndex.value,this.bypass=a.bypass||!1},h.prototype.Overdrive.prototype=Object.create(m,{name:{value:"Overdrive"},defaults:{writable:!0,value:{drive:{value:1,min:0,max:1,automatable:!0,type:n,scaled:!0},outputGain:{value:1,min:0,max:1,automatable:!0,type:n,scaled:!0},curveAmount:{value:.725,min:0,max:1,automatable:!1},algorithmIndex:{value:0,min:0,max:5,automatable:!1,type:p}}},k_nSamples:{value:8192},drive:{get:function(){return this.inputDrive.gain},set:function(a){this._drive=a}},curveAmount:{get:function(){return this._curveAmount},set:function(a){this._curveAmount=a,void 0===this._algorithmIndex&&(this._algorithmIndex=0),this.waveshaperAlgorithms[this._algorithmIndex](this._curveAmount,this.k_nSamples,this.ws_table),this.waveshaper.curve=this.ws_table}},outputGain:{get:function(){return this.outputDrive.gain},set:function(a){this._outputGain=b(a)}},algorithmIndex:{get:function(){return this._algorithmIndex},set:function(a){this._algorithmIndex=a>>0,this.curveAmount=this._curveAmount}},waveshaperAlgorithms:{value:[function(a,b,c){a=Math.min(a,.9999);var d,e,f=2*a/(1-a);for(d=0;b>d;d++)e=2*d/b-1,c[d]=(1+f)*e/(1+f*Math.abs(e))},function(a,b,c){var d,f,g;for(d=0;b>d;d++)f=2*d/b-1,g=(.5*Math.pow(f+1.4,2)-1)*g>=0?5.8:1.2,c[d]=e(g)},function(a,b,c){var d,f,g,h=1-a;for(d=0;b>d;d++)f=2*d/b-1,g=0>f?-Math.pow(Math.abs(f),h+.04):Math.pow(f,h),c[d]=e(2*g)},function(a,b,c){var e,f,g,h,i=1-a>.99?.99:1-a;for(e=0;b>e;e++)f=2*e/b-1,h=Math.abs(f),i>h?g=h:h>i?g=i+(h-i)/(1+Math.pow((h-i)/(1-i),2)):h>1&&(g=h),c[e]=d(f)*g*(1/((i+1)/2))},function(a,b,c){var d,e;for(d=0;b>d;d++)e=2*d/b-1,-.08905>e?c[d]=-3/4*(1-Math.pow(1-(Math.abs(e)-.032857),12)+1/3*(Math.abs(e)-.032847))+.01:e>=-.08905&&.320018>e?c[d]=-6.153*e*e+3.9375*e:c[d]=.630035},function(a,b,c){var d,e,f=2+Math.round(14*a),g=Math.round(Math.pow(2,f-1));for(d=0;b>d;d++)e=2*d/b-1,c[d]=Math.round(e*g)/g}]}}),h.prototype.Phaser=function(a){a||(a=this.getDefaults()),this.input=f.createGain(),this.splitter=this.activateNode=f.createChannelSplitter(2),this.filtersL=[],this.filtersR=[],this.feedbackGainNodeL=f.createGain(),this.feedbackGainNodeR=f.createGain(),this.merger=f.createChannelMerger(2),this.filteredSignal=f.createGain(),this.output=f.createGain(),this.lfoL=new g.LFO({target:this.filtersL,callback:this.callback}),this.lfoR=new g.LFO({target:this.filtersR,callback:this.callback});for(var b=this.stage;b--;)this.filtersL[b]=f.createBiquadFilter(),this.filtersR[b]=f.createBiquadFilter(),this.filtersL[b].type=this.filtersL[b].ALLPASS,this.filtersR[b].type=this.filtersR[b].ALLPASS;this.input.connect(this.splitter),this.input.connect(this.output),this.splitter.connect(this.filtersL[0],0,0),this.splitter.connect(this.filtersR[0],1,0),this.connectInOrder(this.filtersL),this.connectInOrder(this.filtersR),this.filtersL[this.stage-1].connect(this.feedbackGainNodeL),this.filtersL[this.stage-1].connect(this.merger,0,0),this.filtersR[this.stage-1].connect(this.feedbackGainNodeR),this.filtersR[this.stage-1].connect(this.merger,0,1),this.feedbackGainNodeL.connect(this.filtersL[0]),this.feedbackGainNodeR.connect(this.filtersR[0]),this.merger.connect(this.output),this.rate=a.rate||this.defaults.rate.value,this.baseModulationFrequency=a.baseModulationFrequency||this.defaults.baseModulationFrequency.value,this.depth=a.depth||this.defaults.depth.value,this.feedback=a.feedback||this.defaults.feedback.value,this.stereoPhase=a.stereoPhase||this.defaults.stereoPhase.value,this.lfoL.activate(!0),this.lfoR.activate(!0),this.bypass=a.bypass||!1},h.prototype.Phaser.prototype=Object.create(m,{name:{value:"Phaser"},stage:{value:4},defaults:{writable:!0,value:{rate:{value:.1,min:0,max:8,automatable:!1},depth:{value:.6,min:0,max:1,automatable:!1},feedback:{value:.7,min:0,max:1,automatable:!1},stereoPhase:{value:40,min:0,max:180,automatable:!1},baseModulationFrequency:{value:700,min:500,max:1500,automatable:!1}}},callback:{value:function(a,b){for(var c=0;4>c;c++)a[c].frequency.value=b}},depth:{get:function(){return this._depth},set:function(a){this._depth=a,this.lfoL.oscillation=this._baseModulationFrequency*this._depth,this.lfoR.oscillation=this._baseModulationFrequency*this._depth}},rate:{get:function(){return this._rate},set:function(a){this._rate=a,this.lfoL.frequency=this._rate,this.lfoR.frequency=this._rate}},baseModulationFrequency:{enumerable:!0,get:function(){return this._baseModulationFrequency},set:function(a){this._baseModulationFrequency=a,this.lfoL.offset=this._baseModulationFrequency,this.lfoR.offset=this._baseModulationFrequency,this._depth=this._depth}},feedback:{get:function(){return this._feedback},set:function(a){this._feedback=a,this.feedbackGainNodeL.gain.value=this._feedback,this.feedbackGainNodeR.gain.value=this._feedback}},stereoPhase:{get:function(){return this._stereoPhase},set:function(a){this._stereoPhase=a;var b=this.lfoL._phase+this._stereoPhase*Math.PI/180;b=c(b,2*Math.PI),this.lfoR._phase=b}}}),h.prototype.Tremolo=function(a){a||(a=this.getDefaults()),this.input=f.createGain(),this.splitter=this.activateNode=f.createChannelSplitter(2),this.amplitudeL=f.createGain(),this.amplitudeR=f.createGain(),this.merger=f.createChannelMerger(2),this.output=f.createGain(),this.lfoL=new g.LFO({target:this.amplitudeL.gain,callback:l}),this.lfoR=new g.LFO({target:this.amplitudeR.gain,callback:l}),this.input.connect(this.splitter),this.splitter.connect(this.amplitudeL,0),this.splitter.connect(this.amplitudeR,1),this.amplitudeL.connect(this.merger,0,0),this.amplitudeR.connect(this.merger,0,1),this.merger.connect(this.output),this.rate=a.rate||this.defaults.rate.value,this.intensity=a.intensity||this.defaults.intensity.value,this.stereoPhase=a.stereoPhase||this.defaults.stereoPhase.value,this.lfoL.offset=1-this.intensity/2,this.lfoR.offset=1-this.intensity/2,this.lfoL.phase=this.stereoPhase*Math.PI/180,this.lfoL.activate(!0),this.lfoR.activate(!0),this.bypass=a.bypass||!1},h.prototype.Tremolo.prototype=Object.create(m,{name:{value:"Tremolo"},defaults:{writable:!0,value:{intensity:{value:.3,min:0,max:1,automatable:!1},stereoPhase:{value:0,min:0,max:180,automatable:!1},rate:{value:5,min:.1,max:11,automatable:!1}}},intensity:{enumerable:!0,get:function(){return this._intensity},set:function(a){this._intensity=a,this.lfoL.offset=1-this._intensity/2,this.lfoR.offset=1-this._intensity/2,this.lfoL.oscillation=this._intensity,this.lfoR.oscillation=this._intensity}},rate:{enumerable:!0,get:function(){return this._rate},set:function(a){this._rate=a,this.lfoL.frequency=this._rate,this.lfoR.frequency=this._rate}},stereoPhase:{enumerable:!0,get:function(){return this._rate},set:function(a){this._stereoPhase=a;var b=this.lfoL._phase+this._stereoPhase*Math.PI/180;b=c(b,2*Math.PI),this.lfoR.phase=b}}}),h.prototype.WahWah=function(a){a||(a=this.getDefaults()),this.input=f.createGain(),this.activateNode=f.createGain(),this.envelopeFollower=new g.EnvelopeFollower({target:this,callback:function(a,b){a.sweep=b}}),this.filterBp=f.createBiquadFilter(),this.filterPeaking=f.createBiquadFilter(),this.output=f.createGain(),this.activateNode.connect(this.filterBp),this.filterBp.connect(this.filterPeaking),this.filterPeaking.connect(this.output),this.init(),this.automode=a.enableAutoMode||this.defaults.automode.value,this.resonance=a.resonance||this.defaults.resonance.value,this.sensitivity=a.sensitivity||this.defaults.sensitivity.value,this.baseFrequency=a.baseFrequency||this.defaults.baseFrequency.value,this.excursionOctaves=a.excursionOctaves||this.defaults.excursionOctaves.value,this.sweep=a.sweep||this.defaults.sweep.value,this.activateNode.gain.value=2,this.envelopeFollower.activate(!0),this.bypass=a.bypass||!1},h.prototype.WahWah.prototype=Object.create(m,{name:{value:"WahWah"},defaults:{writable:!0,value:{automode:{value:!0,automatable:!1,type:o},baseFrequency:{value:.5,min:0,max:1,automatable:!1},excursionOctaves:{value:2,min:1,max:6,automatable:!1},sweep:{value:.2,min:0,max:1,automatable:!1},resonance:{value:10,min:1,max:100,automatable:!1},sensitivity:{value:.5,min:-1,max:1,automatable:!1}}},activateCallback:{value:function(a){this.automode=a}},automode:{get:function(){return this._automode},set:function(a){this._automode=a,a?(this.activateNode.connect(this.envelopeFollower.input),this.envelopeFollower.activate(!0)):(this.envelopeFollower.activate(!1),this.activateNode.disconnect(),this.activateNode.connect(this.filterBp))}},sweep:{enumerable:!0,get:function(){return this._sweep.value},set:function(a){this._sweep=Math.pow(a>1?1:0>a?0:a,this._sensitivity),this.filterBp.frequency.value=this._baseFrequency+this._excursionFrequency*this._sweep,this.filterPeaking.frequency.value=this._baseFrequency+this._excursionFrequency*this._sweep}},baseFrequency:{enumerable:!0,get:function(){return this._baseFrequency},set:function(a){this._baseFrequency=50*Math.pow(10,2*a),this._excursionFrequency=Math.min(this.sampleRate/2,this.baseFrequency*Math.pow(2,this._excursionOctaves)),this.filterBp.frequency.value=this._baseFrequency+this._excursionFrequency*this._sweep,this.filterPeaking.frequency.value=this._baseFrequency+this._excursionFrequency*this._sweep}},excursionOctaves:{enumerable:!0,get:function(){return this._excursionOctaves},set:function(a){this._excursionOctaves=a,this._excursionFrequency=Math.min(this.sampleRate/2,this.baseFrequency*Math.pow(2,this._excursionOctaves)),this.filterBp.frequency.value=this._baseFrequency+this._excursionFrequency*this._sweep,this.filterPeaking.frequency.value=this._baseFrequency+this._excursionFrequency*this._sweep}},sensitivity:{enumerable:!0,get:function(){return this._sensitivity},set:function(a){this._sensitivity=Math.pow(10,a)}},resonance:{enumerable:!0,get:function(){return this._resonance},set:function(a){this._resonance=a,this.filterPeaking.Q=this._resonance}},init:{value:function(){this.output.gain.value=1,this.filterPeaking.type=5,this.filterBp.type=2,this.filterPeaking.frequency.value=100,this.filterPeaking.gain.value=20,this.filterPeaking.Q.value=5,this.filterBp.frequency.value=100,this.filterBp.Q.value=1,this.sampleRate=f.sampleRate}}}),h.prototype.EnvelopeFollower=function(a){a||(a=this.getDefaults()),this.input=f.createGain(),this.jsNode=this.output=f.createScriptProcessor(this.buffersize,1,1),this.input.connect(this.output),this.attackTime=a.attackTime||this.defaults.attackTime.value,this.releaseTime=a.releaseTime||this.defaults.releaseTime.value,this._envelope=0,this.target=a.target||{},this.callback=a.callback||function(){}},h.prototype.EnvelopeFollower.prototype=Object.create(m,{name:{value:"EnvelopeFollower"},defaults:{value:{attackTime:{value:.003,min:0,max:.5,automatable:!1},releaseTime:{value:.5,min:0,max:.5,automatable:!1}}},buffersize:{value:256},envelope:{value:0},sampleRate:{value:44100},attackTime:{enumerable:!0,get:function(){return this._attackTime},set:function(a){this._attackTime=a,this._attackC=Math.exp(-1/this._attackTime*this.sampleRate/this.buffersize)}},releaseTime:{enumerable:!0,get:function(){return this._releaseTime},set:function(a){this._releaseTime=a,this._releaseC=Math.exp(-1/this._releaseTime*this.sampleRate/this.buffersize)}},callback:{get:function(){return this._callback},set:function(a){"function"==typeof a?this._callback=a:console.error("tuna.js: "+this.name+": Callback must be a function!")}},target:{get:function(){return this._target},set:function(a){this._target=a}},activate:{value:function(a){this.activated=a,a?(this.jsNode.connect(f.destination),this.jsNode.onaudioprocess=this.returnCompute(this)):(this.jsNode.disconnect(),this.jsNode.onaudioprocess=null)}},returnCompute:{value:function(a){return function(b){a.compute(b)}}},compute:{value:function(a){var b,c,d,e,f=a.inputBuffer.getChannelData(0).length,g=a.inputBuffer.numberOfChannels;if(c=d=e=0,g>1)for(e=0;f>e;++e)for(;g>c;++c)b=a.inputBuffer.getChannelData(c)[e],d+=b*b/g;else for(e=0;f>e;++e)b=a.inputBuffer.getChannelData(0)[e],d+=b*b;d=Math.sqrt(d),this._envelope<d?(this._envelope*=this._attackC,this._envelope+=(1-this._attackC)*d):(this._envelope*=this._releaseC,this._envelope+=(1-this._releaseC)*d),this._callback(this._target,this._envelope)}}}),h.prototype.LFO=function(a){this.output=f.createScriptProcessor(256,1,1),this.activateNode=f.destination,this.frequency=a.frequency||this.defaults.frequency.value,this.offset=a.offset||this.defaults.offset.value,this.oscillation=a.oscillation||this.defaults.oscillation.value,this.phase=a.phase||this.defaults.phase.value,this.target=a.target||{},this.output.onaudioprocess=this.callback(a.callback||function(){}),this.bypass=a.bypass||!1},h.prototype.LFO.prototype=Object.create(m,{name:{value:"LFO"},bufferSize:{value:256},sampleRate:{value:44100},defaults:{value:{frequency:{value:1,min:0,max:20,automatable:!1},offset:{value:.85,min:0,max:22049,automatable:!1},oscillation:{value:.3,min:-22050,max:22050,automatable:!1},phase:{value:0,min:0,max:2*Math.PI,automatable:!1}}},frequency:{get:function(){return this._frequency},set:function(a){this._frequency=a,this._phaseInc=2*Math.PI*this._frequency*this.bufferSize/this.sampleRate}},offset:{get:function(){return this._offset},set:function(a){this._offset=a}},oscillation:{get:function(){return this._oscillation},set:function(a){this._oscillation=a}},phase:{get:function(){return this._phase},set:function(a){this._phase=a}},target:{get:function(){return this._target},set:function(a){this._target=a}},activate:{value:function(a){a?this.output.connect(f.destination):this.output.disconnect(f.destination)}},callback:{value:function(a){var b=this;return function(){b._phase+=b._phaseInc,b._phase>2*Math.PI&&(b._phase=0),a(b._target,b._offset+b._oscillation*Math.sin(b._phase))}}}}),h.prototype.Panner=function(a){a||(a=this.getDefaults()),this.input=f.createGain(),this.activateNode=f.createGain(),this.output=f.createGain(),this.panner=f.createPanner(),this.activateNode.connect(this.panner),this.panner.connect(this.output),this.bypass=a.bypass||!1,this.x=a.x||0,this.y=a.y||1,this.z=a.z||1,this.panningModel=a.panningModel||0,this.distanceModel=a.distanceModel||0};var q=function(a){return{enumerable:!0,get:function(){return this["_"+a]},set:function(b){this["_"+a]=b,this.panner.setPosition(this._x||0,this._y||0,this._z||0)}}},r=function(a){return{enumerable:!0,get:function(){return this["_"+a]},set:function(b){this["_"+a]=b,this.panner[a]=b}}},s=function(a,b,c,d){return{value:a,min:b,max:c,automatable:d}};h.prototype.Panner.prototype=Object.create(m,{name:{value:"Panner"},defaults:{writable:!0,value:{x:s(0,-20,20,!1),y:s(0,-20,20,!1),z:s(0,-20,20,!1),distanceModel:s(0,0,2,!1),panningModel:s(0,0,2,!1)}},x:q("x"),y:q("y"),z:q("z"),panningModel:r("panningModel"),distanceModel:r("distanceModel")}),h.prototype.Volume=function(a){a||(a=this.getDefaults()),this.input=f.createGain(),this.activateNode=f.createGain(),this.output=f.createGain(),this.activateNode.connect(this.output),this.bypass=a.bypass||!1,this.amount=a.amount||this.defaults.amount.value},h.prototype.Volume.prototype=Object.create(m,{name:{value:"Volume"},defaults:{writable:!0,value:{amount:s(0,0,2,!1)}},amount:{enumerable:!0,get:function(){return this._volume},set:function(a){this._volume=a,this.activateNode.gain.value=a}}}),h.prototype.Frequency=function(a){a||(a=this.getDefaults()),this.trebleFilter=f.createBiquadFilter(),this.trebleFilter.type=this.trebleFilter.HIGHSHELF,this.trebleFilter.frequency.value=8e3,this.trebleFilter.Q.value=0,this.midtoneFilter=f.createBiquadFilter(),this.midtoneFilter.type=this.midtoneFilter.PEAKING,this.midtoneFilter.frequency.value=1e3,this.midtoneFilter.Q.value=0,this.bassFilter=f.createBiquadFilter(),this.bassFilter.type=this.bassFilter.LOWSHELF,this.bassFilter.frequency.value=200,this.bassFilter.Q.value=0,this.input=f.createGain(),
this.activateNode=f.createGain(),this.output=f.createGain(),this.activateNode.connect(this.bassFilter),this.bassFilter.connect(this.midtoneFilter),this.midtoneFilter.connect(this.trebleFilter),this.trebleFilter.connect(this.output),this.bypass=a.bypass||!1,this.volume=a.volume||!1,this.treble=a.treble||!1,this.midtone=a.midtone||!1,this.bass=a.bass||!1};var t=function(a,b){return{enumerable:!0,get:function(){return this["_"+a]},set:function(c){this["_"+a]=c,this[b||a+"Filter"].gain.value=c}}};h.prototype.Frequency.prototype=Object.create(m,{name:{value:"Frequency"},defaults:{writable:!0,value:{volume:s(1,0,2,!1),treble:s(0,-20,20,!1),midtone:s(0,-20,20,!1),bass:s(0,-20,20,!1)}},volume:t("volume","activateNode"),treble:t("treble"),midtone:t("midtone"),bass:t("bass")}),"function"==typeof define?define("Tuna",[],function(){return h}):a.Tuna=h}(this);