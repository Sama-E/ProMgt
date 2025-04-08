import Image from 'next/image'
import React from 'react'

import { Comment } from "@/state/api";
import { format } from "date-fns";

type Props = {
  comment: Comment;
};


const CommentCard = ({ comment }: Props) => {

  return (
    <>
      <div className="flex pt-3">
      {/* Comments */}
        <div className="flex h-12 w-12 items-center justify-center">
          <Image
            src= {"/p5.jpeg"}
            alt=""
            width={150}
            height={75}
            className="h-full rounded-full object-cover visible xs:invisible"
          />
        </div>

        <div className="ml-3">
          <div className="">{comment.author?.username}</div>
          <div>{comment.createdAt}</div>
          <div className="mt-2">{comment.text}
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentCard