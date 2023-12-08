# A specific to bulk-update page analysis

## Assumptions
* there won't be multiple table on the same screen. So that we can dyrectly inject the services without creating new instances (it wwill be shared)


## Sudo code
```html
<bulk-update>
    <!--
    - services : 'bulk-update' , 'data-manager'
    - bulk-update service : to perform operation specific to bulk update lik fetch test data, interpreate action taken on any fields of table or filter
    - data-manager  service : for generic filter and pagination on dataSource. Will have data source subject and all component should suscribe it
    -->

    <bulk-update-filter>
        services : 'bulk-update' , 'data-manager'
        @Output : loadTestData(), loadLivedata(), filterData(criteria)
    </bulk-update-filter>

    <bulk-update-data-table>
        services : 'bulk-update'
        @Output : onRowSelection(), 
    </bulk-update-data-table>

    <pagination>
        
        @Input : page, totalPages
        @Output : onPaginationUpdate(page,pageSize)
    </pagination>


</bulk-update>
```


### Tasks:
* ~~Bulk update components and service added~~
* ~~Data manager service added~~
* ~~bind filter object~~
* ~~load test or live data function~~
* ~~rename Bulk update to Bulkupdate~~
* ~~Dynamic categories dropdown (depends on the environment)~~
* ~~truncate component to truncate the product description~~
* ~~table component - actually this will also going to static only as~~
        ** ~~product name, desc,category, image, link, select checkbox~~
* ~~listen to the filter change~~  filter login will be the part of API
* ~~general search-box in filter to search by description~~  -- searching will be handled by API
* ~~pagination (considering a general component)  component to bulk-update component to service~~
* check actual product service
        ~~I think we are getting the token, need to check wheter we are intercepting hte service or not~~
        ~~load original categories & products~~
        ~~Load data as per the category~~
        ~~got the url with params pageNo and pageSize, have to check how previously we handled the totalRecords~~
        ~~Accordingly will have to change the pagination component if needed.~~
* ~~initially all 500 records are displayed instead of only equals to PageSize~~
* ~~check if api calls are corect~~
* ~~if no records received it should hide pagination~~
* ~~get products could be called from multiple places like pagination or onFilter load etc.~~
* ~~pagination styling~~
* ~~Checkbox selection~~
* ~~action on selection rows~~
* ~~after datasource updated selection cound should be reset~~




