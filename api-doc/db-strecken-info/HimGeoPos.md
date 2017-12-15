# HimGeoPos

## Query Parameters

`req` looks like this

```json
{"prio":100,"maxNum":5000,"getPolyLine":true,"rect":{"llCrd":{"x":12611960,"y":51444636},"urCrd":{"x":14934540,"y":51867426}},"dateB":"20170512","timeB":"180000","dateE":"20170513","timeE":"000000","onlyHimId":true,"himFltrL":[{"type":"HIMCAT","mode":"INC","value":"0"},{"type":"HIMCAT","mode":"INC","value":"1"},{"type":"PROD","mode":"INC","value":3}]}
```

### Parameters Which Are Known to Change Something

* `prio`: maximum priority value (very important messages have a *low* prio number!)
* `rect`: array of objects, geographical bounding box filter
* `onlyHimId`: boolean. Additional information about the the disruption as human-readable text is added if this parameter is set `false`.
* `himFltrL`: array of objects
** `type`: string, key you want to filter (left hand side of the comparison). Known keys are `HIMCAT` and `PROD`. 
** `mode`: string, operator. Known value is `INC` (seems to mean "include") which adds an AND between the expressions and makes the expression itself being an equality filter (`key == value`).
** `value`: string, value you want to filter (right hand side of the comparison)
** Filtering by `HIMCAT` means to filter for `res.common.himL[].cat` and can be used to drop all planned or unplanned disruptions. Valid values for HIMCAT are `0` for unplanned and `1` for planned disruptions. Filtering by `PROD` means to filter the results by the type of traffic which is affected. Valid values for `PROD` can be found below. If you filter for a `PROD` value which is not valid (e.g. `4`), the API will return large unplanned disruptions like storms or hacker attacks.


### Examples:

All unplanned disruptions in Germany:

```json
{"prio":100,"maxNum":5000,"getPolyLine":true,"rect":{"llCrd":{"x":12611960,"y":51444636},"urCrd":{"x":14934540,"y":51867426}},"dateB":"20170512","timeB":"180000","dateE":"20170513","timeE":"000000","onlyHimId":false,"himFltrL":[{"type":"HIMCAT","mode":"INC","value":"0"},{"type":"HIMCAT","mode":"INC","value":"1"},{"type":"PROD","mode":"INC","value":3},{"type":"PROD","mode":"INC","value":24},{"type":"PROD","mode":"INC","value":1920}]}
```

If you only want to get messages of the highest priority (message of the day), use following parameters:

```json
{"ver":"1.15","lang":"deu","auth":{"type":"AID","aid":"hf7mcf9bv3nv8g5f"},"client":{"id":"DBZUGRADARNETZ","type":"WEB","name":"webapp","v":"0.1.0"},"formatted":false,"svcReqL":[{"meth":"HimGeoPos","req":{"prio":100,"maxNum":5000,"onlyHimId":false,"himFltrL":[{"type":"HIMCAT","mode":"INC","value":"0"},{"type":"PROD","mode":"INC","value":4}]},"cfg":{"cfgGrpL":[],"cfgHash":"i74dckao7PmBwS0rbk0p"}}],"ext":"DBNETZZUGRADAR.2"}
```


## Respsonse

The `res` objekt has following properties:

* `common`: object
* `edgeRefL`: array of type integer, list of edges referenced
* `lastUpd`: string, format `YYYY-MM-DD, HH:MM`
* `msgRefL`: array of integer, list of referenced messages?

### common

* `crdSysL`: array with objects, descriptions of the used coordinate systems
* `himL`: array of objects
* `himMsgEdgeL`: array of objects
* `himMsgEventL`: array of objects
* `himMsgRegionL`: array of objects, regions affected by large disruptions
* `icoL`: arary of objects
** `res`: string, e.g. `HIM11307`, `HIM11203`, `HIM11012`, `HIM10001`, `HIM11215`. This is the type of disruption. These IDs are used to look up which icon should be placed on the map. The icons themselves give a rough information about the consequences of a disruption.
* `layerL`: array of objects
* `locL`: array of objects, see [`locL`](LocGeoPos.md) at `LocGeoPos` API call
** only the properties `crd`, `extId`, `lid` and `name` are set
* `opL`: empty array
* `polyL`: array of objects, defining the geometry of the edges which are polylines
* `prodL`: empty array
* `remL`: array of objects, empty if `onlyHimID` was set to `false`. See [HimDetails](HimDetails.md) for details.

### crdSysL

A `crdSysL` object has following properties:

* `id`: string `standard`
* `index`: integer, starting with 0
* `type`: string, usually `WGS84`

Up to know only responses are known which use one coordinate system, so `index` is always `0` and `id` always `standard`.

### himL

A `himL` object has following properties:

* `act`: boolean, usually `true` but `false` for large-scale disruptions which cover an area
* `cat`: integer, only known to be `1` for planned disruptions and `0` for unplanned disruptions
* `displayHead`: boolean, only known to be `false`
* `eDate`: string, typical date format, beginning of a disruption
* `eTime`: string, typical time format, beginning of a disruption
* `edgeRefL`: array of integer, seems to be a list of edges which are the geometry of this feature. If this list is missing, it is an disruption which covers a large area, e.g. a failure of a important IT service or a WannaCry attack.
* `eventRefL`: array of integer. These numbers are references to the n-th entries in `himMsgEventL`.
* `hid`: string, known values are `HIM_FREETEXT_108004`, `HIM_FREETEXT_111493` and others
* `icoX`: integer, index in `icoL` array for this disruption
* `lModDate`: date of last update, typical date format
* `lModTime`: time of last update, typical time format
* `prio`: integer, known values: 80, 65, 24, 16, 63, 70 and 1. 1 is used if larger unplanned attacks occur, e.g. storms or malware attacks.
* `prod`: integer, known values: `16383`, `3`
* `pubChL`: array of objects, optional parameter, sometimes missing
* `rRefL`: array of integer, list of referenced texts from the `remL` array
* `regionRefL`: array of integers, refers to a list of regions which are affected. This property is only set if it is a disruption covering a large area.
* `sDate`: string, typical date format, end of a disruption
* `sTime`: string, typical time format, end of a disruption
* `impactL`: array of objects. See [HimGeoPos](HimGeoPos.md) for details. It has only the properties `products`, `icoX` and `prio` if `onlyHimId` was set to `true`.

Please note that planned disruptions often have multiple time intervals which they are valid on, e.g. a construction site every night from 01:00 am to 04:30 am.

Following additional properties are set if `onlyHimId` in the request parameters was set to `false`:

* `head`: string, type of disruption, e.g. `Befahren Ggl auf Befehl je 23:35-00:35 durchg. SGV HA-HLAN-HHIG-HBHE umleiten` or `Totalsperrung je 00:35-07:00 durchg. HA SG 3,4,201`.
* `text`: string, reason of the disruption, e.g. `Arbeiten an LST-Anlagen Neubau ESTW Hamm 1. Baustufe`.


### pubChL

A `pubChL` object has following properties:

* `fDate`: string, typical date format, begin of a disruption
* `fTime`: string, typical time format, begin of a disruption
* `name`: string, e.g. `1`
* `tDate`: string, typical date format, end of a disruption
* `tTime`: string, typical time format, end of a disruption

`fDate` is equal to `tDate and `fTime` is equal to `tTime` if it is no planned disruption. If you need the end time
of an unplanned disruption, you have to get the index of the event in `himMsgEventL` by querying `eventRefL`.

### himMsgEdgeL

A `himMsgEdgeL` has following properties:

* `dir`: integer, known values are 3, 2, 1
* `fLocX`: integer, seems to be an index in the array of `locL` objects, beginning of a line section which is affected by the disruption
* `icoCrd`: object, location where to place the icon/marker? Properties are the same as for all other coordinates objects
* `icoX`: integer, known values are 1, 4, 2
* `msgRefL`: array of integer
* `tLocX`: integer. Seems not to be set if `PolyX` is set, opposite of `fLocX`.
* `polyX`: integer. Seems not to be set if `tLocX` is set, seems to be a reference to another object.

### himMsgRegionL

A `himMsgRegionL` object has following properties:

* `name`: string, name of the region, e.g. `Süd`
* `polyX`: integer
* `polyTypeL`: array of boolean, only known length: 1, only known element: `true`
* `icoCrd`: coordinates of the icon, see `himMsgEdgeL` for details
* `msgRefL`: array of integer, referenced message
* `polyX`: integer, incremented counter but starting with 562?

### himMsgEventL

A `himMsgEventL` has following properties:

* `fDate`: string, typical date format
* `fLocX`: integer, often 0 but higher values below 100 occur frequently
* `fTime`: string, typical time format
* `sectionNums: array of string, seems to be line numbers (VzG numbers) of the railway lines used by the geometry
* `tDate`: string, typical date format
* `tLocX`: integer, see fLocX
* `tTime`: string, typical time format

### layerL

A `layerL` object has following properties:

* `annoCnt`: integer, 0
* `id`: string, `standard`
* `index`: 0

### polyL

A `polyL` object has following properties:

* `crdEncF`: string, e.g. `??????????????????????????`; usually question marks, might be shorter or longer than this example. Looks like being a pattern or bitmask.
* `crdEncS`: string, e.g. `NNNNNNNNNNNNNNNNNNNNNNNNNN`; usually only character `N`, same length as `crdEncS`
* `crdEncYX`: string, [Google Polyline](https://developers.google.com/maps/documentation/utilities/polylinealgorithm), e.g. `ojq{HsbhlAbGnGjAnAhArAdAxA`A~AtArBr@fA`CfE~@fBx@lBr@rBl@|Bd@dCXfCRlCJnC?pCGnCQlCWjCw@pG_ApGsBbPgBrN??`
* `crdEncZ`: string, e.g. `??????????????????????????`; usually question marks, same length as `crdEncS`.
* `delta`: boolean, `True` is the only known value
* `dim`: integer, `3` is the only known value
* `type`: string, coordinate system, `WGS84` is the only known value

