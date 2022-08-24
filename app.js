const $= document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)


const player = $('.player')
const cd = $('.cd')
const heading = $('.name p')
const headingSpan = $('.name span')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn= $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist=$('.playlist')
const volume=$('.volumn')
const amthanh= $('.volunm')
console.log(playBtn)
console.dir(audio)

const app = {
    
    currentIndex:0,
    isPlaying:false,
    isRandom:false,
    isRepeat:false,
    isVolume:false,
    currentVolume:1,
    
    songs: [
        {
            name: "Cô ấy đã từng",
            singer: "Shine Thành Anh",
            path: "./music/coaydatung.mp3",
            image:"./image/img/coaydatung.webp"
              
        },
        {
            name: "Đi đi đi",
            singer: "Vicetone,K-ICM,T-ICM,Kelsey,Zickky ",
            path: "./music/NAVADA-dididi.mp3",
            image:"./image/img/di-di-di.jpeg"
              
        },
        {
            name: "Người âm phủ",
            singer: "OSAD",
            path: "./music/NguoiAmPhu.mp3",
            image: "./image/img/nguoiamphu.webp"
        },
        {
            name: "Cô thắm không về",
            singer: "Phát Hồ x JokeS Bii x Sinike ft. DinhLong",
            path: "./music/cothamkhongve.mp3",
            image: "./image/img/cothamkove.webp"
        },
        {
            name: "Siêu cô đơn",
            singer: "Yan Nguyễn",
            path: "./music/sieucodon.mp3",
            image: "./image/img/sieucodon.jpg"
        },
        {
            name: "Phía sau em",
            singer: "Kay trần x BinZ",
            path: "./music/phiasauem.mp3",
            image: "./image/img/phiasauem.jpg"
        },
        {
            name: "Thê tử",
            singer: "Minh Vương-Hương ly",
            path: "./music/thetu.mp3",
            image:"./image/img/thetu.jpg"
              
        },
        {
            name: "Về bên anh",
            singer: "「Lofi Ver.」- Jack x Mihle ",
            path: "./music/vebenanh.mp3",
            image:"./image/img/vebenanh.jpg"
              
        },
        {
            name: "Tri kỷ",
            singer: "Phan Mạnh Quỳnh",
            path: "./music/triki.mp3",
            image:"./image/img/triki.jpg"
              
        },
        {
            name: "Can't remember the name",
            singer: "No love ",
            path: "./music/Can'trememberthename.mp3",
            image:"./image/img/memberthename.jpg"
              
        },
        {
            name: "Nếu là anh",
            singer: "The Men",
            path: "./music/neulaanh.mp3",
            image:"./image/img/neulaanh.webp"
              
        },
        {
            name: "Tháng 4 là lời nói dối của em",
            singer: "Hà Anh Tuấn",
            path: "./music/thang4noidoi.mp3",
            image:"./image/img/thang4noidoi.jpg"
              
        },
        
    ],
    render: function(){
        const htmls= this.songs.map((song,index) =>{
            return ` <div class="song ${index===this.currentIndex?'active':''}" data-index="${index}">
                        <div class="thumb"
                            style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                `;
        })
        playlist.innerHTML = htmls.join('');
    },
    defineProperties:function(){
        Object.defineProperty(this,'currentSong',{
            get:function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    handelEvents:function(){
        const _this=this;
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
            }
            else{
                audio.play()
            }
            
        }
        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add('playing')
        }
        
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove('playing')
        }

        audio.ontimeupdate= function(){
            if(audio.duration){
                let progressPercent=audio.currentTime/audio.duration*100
                progress.value=progressPercent
                // console.log(progressPercent)
            }
        }

        progress.oninput = function(e){
            audio.currentTime= e.target.value*audio.duration/100
        }

        nextBtn.onclick = function(){
            nextBtn.classList.toggle('active')
            setTimeout(function() {
                nextBtn.classList.toggle('active')
            },200)
            
            if(_this.isRandom){
                _this.playRandomSong()
            }
            else{
                _this.nextSong();
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        prevBtn.onclick = function(){
            prevBtn.classList.toggle('active')
            setTimeout(function() {
                prevBtn.classList.toggle('active')
            },200)
            if(_this.isRandom){
                _this.playRandomSong()
            }
            else{
            _this.prevSong();
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        
        randomBtn.onclick= function(e){
            _this.isRandom=!_this.isRandom
            if(_this.isRepeat){
                _this.isRepeat=!_this.isRepeat
                repeatBtn.classList.toggle('active',_this.isRepeat)
            }
            randomBtn.classList.toggle("active",_this.isRandom)
            console.log(_this.isRandom)
        }

        audio.onended = function(){
            if(!_this.isRepeat){
                if(_this.isRandom){
                    _this.playRandomSong()
                }
                else{
                    _this.nextSong();
                }
                _this.render()
            }
            audio.play()
            _this.scrollToActiveSong()
        }

        repeatBtn.onclick= function(){
            _this.isRepeat=!_this.isRepeat
            if(_this.isRandom){
                _this.isRandom=!_this.isRandom
                randomBtn.classList.toggle('active',_this.isRandom)
            }
            repeatBtn.classList.toggle('active',_this.isRepeat)
        }

        playlist.onclick= function(e){
            const songNode=e.target.closest(".song:not(.active)")
            if(songNode||e.target.closest(".option")){
                // xử lý khi click vào song
                if(songNode){
                   _this.currentIndex=Number(songNode.dataset.index)
                   _this.loadCurrentSong()
                   audio.play()
                   _this.render()
                }
                // xử lý khi click vào song option
                if(e.target.closest(".option")){

                }
            }
        }

        volume.onclick= function(){
            _this.isVolume=!_this.isVolume
            volume.classList.toggle('hidden',_this.isVolume)
            // console.log(audio.volume)
            if(_this.isVolume)audio.volume =0
            else {
                audio.volume=_this.currentVolume
                amthanh.value=_this.currentVolume*100
            }
            console.log(audio.volume)
            if(audio.volume !=0)_this.currentVolume=audio.volume
            else amthanh.value=0

            
        }

        amthanh.oninput= function(e){
            audio.volume= e.target.value/100
            if(audio.volume==0){
                _this.isVolume=!_this.isVolume
                volume.classList.add('hidden')
            }

            if(audio.volume!=0){
                _this.isVolume=!_this.isVolume
                volume.classList.remove('hidden')
                _this.currentVolume=audio.volume
            }
        }

    },

    scrollToActiveSong: function(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block:'center',
            });
        },300)
        
    },

    loadCurrentSong: function(){
        headingSpan.textContent=this.currentSong.singer
        heading.textContent=this.currentSong.name
        cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`
        audio.src=this.currentSong.path
    },

    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex>=this.songs.length){
            this.currentIndex=0;
        }
        this.loadCurrentSong()
        
    },

    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex<0){
            this.currentIndex=this.songs.length-1
        }
        this.loadCurrentSong()
        
    },

    playRandomSong: function(){
        let newIndex
        do{
            newIndex=Math.floor(Math.random()*this.songs.length)
        }while(this.currentIndex===newIndex)

        this.currentIndex=newIndex
        this.loadCurrentSong()
    },
    


    start: function(){
        // Gán cấu hình vào ứng dụng
        // this.loadConfig();

        // định nghĩa các thuộc tính
        this.defineProperties();

        // lắng nghe và xử lý các sự kiện(DOM events)
        this.handelEvents();

        // tải thông tin bài hát đầu tiên vào giao diện khi chạy ứng dụng
        this.loadCurrentSong();
        
        // Render lại playlist
        this.render();

        // hiển thị trạng thái ban đầu của button repeat
        randomBtn.classList.toggle('active',this.isRandom);
        repeatBtn.classList.toggle('active',this.isRepeat);
    }
};

app.start()