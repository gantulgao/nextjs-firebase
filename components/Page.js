import React,{useState, useEffect, Table, Button} from "react"
import {collection,query,onSnapshot,orderBy,limit} from "firebase/firestore"

export default function Page() {

    const [data, setData] = useState([])
    const [newData, setNewData] = useState([])
    const [loading, setLoading] = useState(false)
    const [postsEnd, setPostsEnd] = useState(false)
    const [postLimit, setPostLimit] = useState(25)
    const [lastVisible, setLastVisible] = useState(null)


    useEffect(() => {
        const collectionRef = collection(firestore, "Page")
        const queryResult = query(collectionRef, orderBy("CreatedOn", "desc"), limit(postLimit));
        const unsubscribe = onSnapshot(queryResult, (querySnapshot) => {
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1])
            setData(querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                CreatedOn : doc.data().CreatedOn?.toDate(),
                UpdatedOn : doc.data().UpdatedOn?.toDate()
                }))
            )
        });
        return unsubscribe;
    }, [postLimit])
    const ths = (
        <tr>
            <th>Title</th>
            <th>Created</th>
            <th>Updated</th>
        </tr>
    );
    const fetchMore = () => {
        setLoading(true)
        const collectionRef = collection(firestore, "Page")
        const queryResult = query(collectionRef, orderBy("CreatedOn", "desc"), startAfter(lastVisible), limit(postLimit));
        onSnapshot(queryResult, (querySnapshot) => {
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1])
            setNewData(querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                CreatedOn : doc.data().CreatedOn?.toDate(),
                UpdatedOn : doc.data().UpdatedOn?.toDate()
                }))
            )
        });
        //Commented If Statement cause data is not fetched completely
        //if (newData < postLimit ) { setPostsEnd(true)  }
        setData(data.concat(newData))
        setLoading(false)
        console.log(newData)
    }
    return (
        <>
        <Table highlightOnHover>
          <thead>{ths}</thead>
          <tbody>{
              data.length > 0
              ? data.map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.CreatedOn.toString()}</td>
                  <td>{element.UpdatedOn.toString()}</td>
                </tr>
            ))
              : <tr><td>Loading... / No Data to Display</td></tr>
          }</tbody>
        </Table>
        {!postsEnd && !loading ? <Button fullWidth variant="outline" onClick={fetchMore}>Load More</Button> : <></>}
        </>
    )
}