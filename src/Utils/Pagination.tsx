import React, { useEffect, useState } from 'react'

const Pagination = (props: PaginationProps) => {

    const [linkModels, setLinkModels] = useState<linkModel[]>([])

    const selectPage = (link: linkModel) => {
        //If a user is clicking in the same page they're in
        if(link.page === props.currentPage){
            return;
        }

        // If at the first or last page
        if(!link.enabled){
            return;
        }

        //Let the parent component know a user clicked on a valid page
        props.onChange(link.page)
    }

    const getClass = (link: linkModel) => {
        if(link.active){
            return "active-pointer"
        }

        if(!link.enabled){
            return "disabled"
        }

        return "pointer"
    }

    useEffect(() => {
        // Check if we're on first page
        const previousPageEnabled = props.currentPage !== 1
        const previousPage = props.currentPage - 1
        const links: linkModel[] = []

        links.push({
            text: 'Previous',
            enabled: previousPageEnabled,
            page: previousPage,
            active: false
        })

        //Add navigation elements
        for(let i = 1; i < props.totalAmountOfPages; i++){
            // Check which page we're in and update navigation elements
            if(i > props.currentPage - props.radio && i <= props.currentPage + props.radio){
                links.push({
                    text: `${i}`,
                    active: props.currentPage === i,
                    enabled: true,
                    page: i
                })
            }
        }

        //Check if next button should be enabled
        const nextPageEnabled = props.currentPage !== props.totalAmountOfPages && props.totalAmountOfPages > 0
        const nextPage = props.currentPage + 1

        links.push({
            text: "Next",
            page: nextPage,
            enabled: nextPageEnabled,
            active: false
        })

        //Set Links
        setLinkModels(links)

    }, [props.currentPage, props.totalAmountOfPages, props.radio])

    return (
        <div>
            <nav>
                <ul className='pagination justify-content-center'>
                    {linkModels.map(link => 
                    <li key={link.text} onClick={() => selectPage(link)} className={`page-item cursor ${getClass(link)}`}>
                        <span className='page-link'>{link.text}</span>
                    </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

// For the navigation elements
interface linkModel {
    page: number
    enabled: boolean
    text: string
    active: boolean
}

interface PaginationProps {
    currentPage: number
    totalAmountOfPages: number
    radio: number
    onChange(page: number): void
}

Pagination.defaultProps = {
    radio: 3
}

export default Pagination