import React, { useEffect, useState } from "react";
import "./ItemDetail.scss";
import { poster } from "../../assets";
import { Icon, InlineIcon } from "@iconify/react";
import calendarWeekFill from "@iconify/icons-bi/calendar-week-fill";
import circleFill from "@iconify/icons-bi/circle-fill";
import filePaper2Fill from "@iconify/icons-ri/file-paper-2-fill";
import { Comments, Line, Loading, LoadingBox } from "../../components";
import Markdown from 'react-markdown'
import gfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { coldarkDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism'
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthenticationService from "../auth"
import { Month, Day } from "../../data"

function ItemDetail() {

  const HOST_URI = process.env.HOST_URI || "//promotin.herokuapp.com";
  const { id } = useParams();

  const [ data, setData ] = useState();
  const [ isLiked, setIsLiked ] = useState(false);
  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ favIsLoading, setFavIsLoading ] = useState(false);
  const [ stringifiedDate, setStringifiedDate ] = useState(undefined);

  // Syntax highlighting gawe <Markdown><pre>
  const components = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter className="codeblock" style={theme} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }

  useEffect(() => {

    // Get event data
    axios.get(HOST_URI+"/api/v1/items/view/"+id)
    .then((response) => {
      setData(response.data.data)
      let date = [new Date(response.data.data.tanggal[0]), new Date(response.data.data.tanggal[1])]
      setStringifiedDate([date[0].getDate() +' '+  Month[date[0].getMonth()] + ' ' + date[0].getFullYear(), date[1].getDate() +' '+  Month[date[1].getMonth()] + ' ' + date[1].getFullYear()])
      
    })
    .then((e) => {
      setIsLoaded(true)
      setIsLiked(false)
    })
    .catch(console.error)

    // Get favorite data
    axios.get(HOST_URI+"/api/v1/event/fav")
    .then(result => {
      result.data.data.filter((e) => {
        if(e === id) setIsLiked(true)
      })
    })
  }, [])

  useEffect(() => {
    
  }, [data])

  function handleFavClick() {
    setFavIsLoading(true)
    if (AuthenticationService.getCurrentUser() && isLiked === false) {
      axios.post(HOST_URI+"/api/v1/event/fav", {
        itemId: id,
      })
      .then((result) => {
        setIsLiked(true)
        setFavIsLoading(false)
      })
    } else if(AuthenticationService.getCurrentUser() && isLiked === true) {
      axios.post(HOST_URI+"/api/v1/event/fav", {
        itemId: id,
      })
      .then((result) => {
        setFavIsLoading(false)
      })
    } else window.location.href = "/login";
  }


  return (
    <div className="id-container">
      <div className="id-wrapper">
        <img src={poster} alt="poster" className="poster" />
        <div className="content-wrapper">
          <h1 className="id-title">{isLoaded ? data.title : <LoadingBox height="25px" width="350px" borderRadius="1000px" />}</h1>
          <div className="id-tag">
            <Icon icon={circleFill} className="c-f" />
            <a href="#">lomba</a>
            <Icon icon={circleFill} className="c-f" />
            <a href="#">Digital Art</a>
          </div>

          <Line width={100} />

          <h3 className="tgl-pelaksanaan">
            <Icon icon={calendarWeekFill} /> Tanggal Pelaksanaan
          </h3>
          <div className="tgl-pel-detail">
          {
            isLoaded ?
              data.tanggal.length == 2 ?
                <div>
                  <div className="dari">
                    <p className="ket">Dari</p>
                    <p className="ket-det">{stringifiedDate ? stringifiedDate[0] : ""}</p>
                  </div>
      
                  <div className="sampai">
                    <p className="ket">Sampai</p>
                    <p className="ket-det">{stringifiedDate ? stringifiedDate[1] : ""}</p>
                  </div>
                </div>
              : 
                <div className="dari">
                  <p className="ket-det">{stringifiedDate ? stringifiedDate[0] : ""}</p>
                </div>
            : <LoadingBox height="20px" width="250px" borderRadius="1000px" />
          }
          </div>

          <h3 className="detail-event">
            <Icon icon={filePaper2Fill} /> Detail Event
          </h3>

          <section style={{width: '100%'}}>
            {
              isLoaded ?
                <Markdown className="md-content" disallowedElements={["img", "media", "script"]} remarkPlugins={[gfm]} children={data.description} components={components} />
              : 
                <div style={{marginBottom: '150px'}}>
                  <LoadingBox height="15px" width="370px" borderRadius="1000px" margin="0 0 15px 0" />
                  <LoadingBox height="15px" width="300px" borderRadius="1000px" margin="0 0 15px 0" />
                  <LoadingBox height="15px" width="350px" borderRadius="1000px" margin="0 0 15px 0" />
                  <LoadingBox height="15px" width="300px" borderRadius="1000px" margin="0 0 15px 0" />
                </div>
            }
            
          </section>
          { isLoaded ? 
              favIsLoading ? <button className="add-fav"><Loading /></button>  
              : isLiked ?
                  <button className="rem-fav" onClick={handleFavClick}>Hapus dari Favorit</button>  
                :
                  <button className="add-fav" onClick={handleFavClick}>Tambahkan ke Favorit</button> 
            :
            <LoadingBox height="35px" width="250px" borderRadius="1000px" />
          }
        </div>
      </div>

      <div className="comment">
        <Comments />
      </div>
    </div>
  );
}

export default ItemDetail;
