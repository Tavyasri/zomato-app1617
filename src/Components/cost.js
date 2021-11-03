handleCostChange =(lcost, hcost) => {
    const{ mealtype, location, cuisine, sort, page } =this.state;
    
    const filterObj = {
        mealtype: mealtype,
        location: location,
        sort: sort,
        cuisine: cuisine.length > 0 ? cuisine : undefined,
        lcost,
        hcost,
        page
    };

    axios({
        url: 'http://localhost:1617/filter',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        data: filterObj
    })
        .then(res => {
            this.setState({
                restaurants: res.data.restaurants,
                pageCount: res.data.pageCount,
                lcost,
                hcost
            })
        })
        .catch()

        this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}&sort=${sort}&lcost=${lcost}&hcost=${hcost}`);

}