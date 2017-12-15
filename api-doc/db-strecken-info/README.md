# strecken.info API

This is the inofficial documentation of the API of strecken.info, a map which shows disruptions and constructions on the network of DB Netz AG.
The API does not cover the networks of S-Bahn Berlin and S-Bahn Hamburg although their infrastructure is operated by DB Netz AG, too.

## Coordinate Format

Coordinates used in the query parameters and in the response are WGS84 geographical coordinates (EPSG:4326) but are multiplied by 10^6.
The API returns integers only but the query parameters may contain floating point numbers.

A coordinates object has following parameters:

* `type`: String, z.B. `WGS84`
* `x`: easting (typisch)
* `y`: northing (typisch)
* `z`: elevation, optional

`z` is optional, all others seem to be mandatory.


## Date and Time Format

If not otherwise noted, dates are encoded as strings using following pattern: `YYYYMMDD`. Times are also strings and use the pattern `HHMMSS`.

## Querying the API

mgate.exe is the API endpoint. All queries are done as HTTP POST requests, the payload looks like this:

```
{"ver":"1.15","lang":"deu","auth":{"type":"AID","aid":"hf7mcf9bv3nv8g5f"},"client":{"id":"DBZUGRADARNETZ","type":"WEB","name":"webapp","v":"0.1.0"},"formatted":false,"svcReqL":[{"meth":"LocGeoPos","req":{"rect":{"llCrd":{"x":13540992.736816406,"y":51613752.957501},"urCrd":{"x":14005508.422851562,"y":51698310.32893037}}},"cfg":{"cfgGrpL":[],"cfgHash":"i74dckao7PmBwS0rbk0p"}}],"ext":"DBNETZZUGRADAR.2"}
```

or this:

```
{"ver":"1.15","lang":"deu","auth":{"type":"AID","aid":"hf7mcf9bv3nv8g5f"},"client":{"id":"DBZUGRADARNETZ","type":"WEB","name":"webapp","v":"0.1.0"},"formatted":false,"svcReqL":[{"meth":"HimDetails","req":{"input":"","getTrains":false,"date":"20170512","time":"180000"},"cfg":{"cfgGrpL":[],"cfgHash":"i74dckao7PmBwS0rbk0p"}}],"ext":"DBNETZZUGRADAR.2"}
```

The official web application always sets `ver`, `lang`, `auth`, `client`, `formatted` and `ext` to the same values. `svcReqL` is the interesting field.

The payload looks like JSON but it seems that the backend does not use a full JSON parser. The parameter list below lists some parameters whose absense causes a parse error.

The meaning of the parameters:

* `ver`: string. If missing, a parse error will be returned.
* `lang`: string. If missing, nothing changes.
* `auth`: object. If missing, following will be returned: `{"ver":"1.15","ext":"DBNETZZUGRADAR.2","lang":"deu","id":"ga2ewshw6wky8wcc","err":"AUTH","svcResL":[]}`
* `client`: object. If missing, an error of type "nullptr" will be returnd: `{"ver":"1.15","ext":"DBNETZZUGRADAR.2","lang":"deu","err":"NULLPTR","svcResL":[]}`
* `formatted`: boolean, if set to `true` the response will be formatted JOSN, intendation 2 spaces. But the formatting is buggy, the elements of the `rRefL` array are not intended.
* `cfg`: object. If this is missing, an authentication error will be returned.
** `cfgGrpL`: empty array. If this is missing, nothing changes.
* `rect`: object. If the bounding box misses at the `HimGeoPos` query, the API will respond with an empty JSON wireframe: `{"ver":"1.15","ext":"DBNETZZUGRADAR.2","lang":"deu","id":"5e42wsn24w4w9g88","svcResL":[{"id":"","meth":"HimGeoPos","err":"OK","res":{"common":{"locL":[],"prodL":[],"polyL":[],"layerL":[],"crdSysL":[],"opL":[],"remL":[],"icoL":[],"himMsgEdgeL":[],"himMsgRegionL":[],"himMsgEventL":[]},"lastUpd":"2017-06-09, 11:47"},"errTxt":""}]}`
* `getPolyline`: boolean. Does what its name says.

### Error Repsonses

#### Parse Error

```json
{"ver":"1.15","lang":"deu","err":"PARSE","svcResL":[]}
```

#### Authentication Error

```json
{"ver":"1.15","ext":"DBNETZZUGRADAR.2","lang":"deu","err":"AUTH","svcResL":[]}
```

### svcReqL

svcReqL which contains an object with following attributes:

* `meth`: name of the API call. Following API calls are available: [`HimGeoPos`](HimGeoPos.html), [`HimDetails`](HimDetails.html) and [`LocGeoPos`](LocGeoPos.html). See the following sections for the responses of these calls.
* `req`: object containing some query parameters dependend on the API call being used. See the API calls below for the parameters.
* `cfg`: object which always seems to be `{"cfgGrpL":[],"cfgHash":"i74dckao7PmBwS0rbk0p"}`

Zum Inhalt von `req` siehe unten.

## Available API Calls

* [LocGeoPos](LocGeoPos.html)
* [HimDetails](HimDetails.html)
* [HimGeoPos](HimGeoPos.html) returns a list of all planned and unplanned disruptions. The events have an ID beginning with `HIM_FREETEXT` which is used for the `HimDetails` call to get the location and the event message. This call also returns operating sites with a reduced number of attributes

## Respsonses

The responses always have following properties:

* `ext`
* `id`
* `lang`
* `svcResL`: object

A `svcResL` object has following properties:

* `err`: string, see `LocGeoPos`
* `errTxt`: string
* `id`: string, empty
* `meth`: string `HimGeoPos`
* `res`: Objekt
* `ver`: String, `1.15`

The properties of the `res` object depend on the API call.
