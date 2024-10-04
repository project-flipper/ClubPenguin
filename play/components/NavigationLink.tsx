import React from "react"

type Props = {
    link?: string,
    text: string
};

export default ({ link, text }: Props) => {
    return <a href={link}>{text}</a>
};