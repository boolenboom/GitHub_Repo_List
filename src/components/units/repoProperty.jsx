import '../../stylesheets/repoProperty.scss'

function RepoProperty({count, type}){
    const propertyType = {
        star: (
            <div className="star status">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="icon-color d-inline-block">
                    <path fillRule="evenodd" d="M8 .25
                    a.75.75 0 01.673.418
                    l1.882 3.815 4.21.612
                    a.75.75 0 01.416 1.279
                    l-3.046 2.97.719 4.192
                    a.75.75 0 01-1.088.791
                    L8 12.347l-3.766 1.98
                    a.75.75 0 01-1.088-.79
                    l.72-4.194L.818 6.374
                    a.75.75 0 01.416-1.28
                    l4.21-.611L7.327.668
                    A.75.75 0 018 .25z
                    m0 2.445
                    L6.615 5.5
                    a.75.75 0 01-.564.41
                    l-3.097.45 2.24 2.184
                    a.75.75 0 01.216.664
                    l-.528 3.084 2.769-1.456
                    a.75.75 0 01.698 0
                    l2.77 1.456-.53-3.084
                    a.75.75 0 01.216-.664
                    l2.24-2.183-3.096-.45
                    a.75.75 0 01-.564-.41
                    L8 2.694
                    v.001z"></path>
                </svg>
                <span aria-label="the repository starred times :">{count} stars</span>
            </div>
        ),
        watch: (
            <div className="watch status">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="icon-color d-inline-block">
                    <path fillRule="evenodd" d="M1.679 7.932
                    c.412-.621 1.242-1.75 2.366-2.717
                    C5.175 4.242 6.527 3.5 8 3.5
                    c1.473 0 2.824.742 3.955 1.715 
                    1.124.967 1.954 2.096 2.366 2.717
                    a.119.119 0 010 .136
                    c-.412.621-1.242 1.75-2.366 2.717
                    C10.825 11.758 9.473 12.5 8 12.5
                    c-1.473 0-2.824-.742-3.955-1.715
                    C2.92 9.818 2.09 8.69 1.679 8.068
                    a.119.119 0 010-.136zM8 2
                    c-1.981 0-3.67.992-4.933 2.078
                    C1.797 5.169.88 6.423.43 7.1
                    a1.619 1.619 0 000 1.798
                    c.45.678 1.367 1.932 2.637 3.024
                    C4.329 13.008 6.019 14 8 14
                    c1.981 0 3.67-.992 4.933-2.078 
                    1.27-1.091 2.187-2.345 2.637-3.023
                    a1.619 1.619 0 000-1.798
                    c-.45-.678-1.367-1.932-2.637-3.023
                    C11.671 2.992 9.981 2 8 2zm0 8
                    a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
                <span aria-label="the repository watching :">{count} watching</span>
            </div>
        ),
        forks: (
            <div className="forks status">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="icon-color d-inline-block">
                    <path fillRule="evenodd" d="M5 3.25
                    a.75.75 0 11-1.5 0 .75.75 0 011.5 0z
                    m0 2.122a2.25 2.25 0 10-1.5 0
                    v.878
                    A2.25 2.25 0 005.75 8.5
                    h1.5v2.128
                    a2.251 2.251 0 101.5 0
                    V8.5h1.5
                    a2.25 2.25 0 002.25-2.25
                    v-.878a2.25 2.25 0 10-1.5 0
                    v.878
                    a.75.75 0 01-.75.75
                    h-4.5A.75.75 0 015 6.25
                    v-.878z
                    m3.75 7.378
                    a.75.75 0 11-1.5 0 .75.75 0 011.5 0z
                    m3-8.75
                    a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                </svg>
                <span aria-label="the repository forks :">{count} forks</span>
            </div>
        )
    }

    return propertyType[type];
}

export default RepoProperty