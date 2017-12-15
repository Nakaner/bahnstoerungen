# HimDetails

This request exists in two variations:

* If `input` is an empty string, it request returns disruptions which affect a large area, e.g. a whole state or that a neighbouring railway operator is unable to accept trains due to a disruption on his network.
* If `input` is the textual ID of a disruption, e.g. `HIM_FREETEXT_136758`, you will get details about the disruption and its geometry.

## Query Parameters

The `req` property of the query has following value:

```json
{"input":"","getTrains":false,"date":"20170512","time":"180000"}
```

This call is also used to query details about a local disruption. In that case `input` is the `HIM_FREETEXT_`… reference ID of the marker.

```json
{"input":"HIM_FREETEXT_136758","getTrains":false,"date":"20170513","time":"110000"}
```

* `date`: string, common date format (see above). This is the date the user queried information for.
* `time`: string, common time format (see above). This is the time the user queried information for.

## Response

The response contains usually nearly no information.

```json
{
    "ext": "DBNETZZUGRADAR.2",
    "id": "rpg2qszmkqx5924c",
    "lang": "deu",
    "svcResL": [
        {
            "err": "OK",
            "errTxt": "",
            "id": "",
            "meth": "HimDetails",
            "res": {
                "common": {
                    "crdSysL": [],
                    "himMsgEdgeL": [],
                    "himMsgEventL": [],
                    "himMsgRegionL": [],
                    "icoL": [],
                    "layerL": [],
                    "locL": [],
                    "opL": [],
                    "polyL": [],
                    "prodL": [],
                    "remL": []
                },
                "lastUpd": "2017-05-05, 10:42"
            }
        }
    ],
    "ver": "1.15"
}
```

If there are informations, it follows the following documentation:

* `common`: object
* `edgeRefL`: array of integer, list of edge references used by this response
* `lastUpd`: string, last update, format YYYY-MM-DD, HH:MM
* `msgRefL`: array of integer, list of message references used by this response

The `common` property is a object with following properties:

* `crdSysL`: empty array
* `himL`: array of objects
* `himMsgEdgeL`: array of objects, documented at [HimGeoPos](HimGeoPos.md)
* `himMsgEventL`: array of objects, documented at [HimGeoPos](HimGeoPos.md), encoding beginning and end of a disruption and the affected line numbers (VzG numbers)
* `himMsgRegionL`: empty array
* `icoL`: array of objects
* `layerL`: empty array
* `locL`: array of operating sites, see [`locL`](LocGeoPos.md) at `LocGeoPos` API call
** only the properties `crd`, `extId`, `lid` and `name` are set
* `opL`: empty array
* `polyL`: empty array
* `prodL`: empty array
* `remL`: array of objects

??? incomplete, some properties are missing

### himL

`himL` has following properties:

* `act`: boolean (true)
* `cat`: integer (seems to be 0 both for large and local disruptions)
* `displayHead`: boolean (false both)
* `eDate`: string, common date format, end of disruption
* `eTime`: string, common time format, end of disruption
* `edgeRefL`: array of integer, list of all used event IDs
* `eventRefL`: array of integer, list of all used event IDs
* `head`: string, e.g. `Sammelmeldung: Sonstige Unregelm\u00e4\u00dfigkeit` or `St\u00f6rung: Witterungsbedingte Einfl\u00fcsse  - Sturmsch\u00e4den`
* `hid`: string, e.g. `HIM_FREETEXT_136770`. This is the common reference used by various API calls.
* `icoX`: integer, e.g. 0
* `impactL`: array of objects
* `lModDate`: string, common date format, day of last update of this entry
* `lModTime`: string, common time format, time of last update of this entry
* `prio`: integer, e.g. 1
* `prod`: integer, e.g. 3
* `pubChL`: array of objects, see `HimGeoPos` call
* `rRefL`: array of integer
* `sDate`: string, common date format, beginning of the disruption
* `sTime`: string, common time format, beginning of the disruption
* `text`: string, text message about the disruption


### impactL

This array has usually 1 to 3 elements, one per "product" (SPFV, SPNV, SGV).

* `icoX`: integer, e.g. 0, reference to an icon in `icoL` list
* `prio`: integer
* `impact`: string, consequence of the disruption. Following values have been seen already (incomplete list):
** `Zur\u00fcckhalten von Z\u00fcgen`
** `Fahrzeitverl\u00e4ngerung auf Regellaufweg`
* `prodCode`: string, either `SPFV`, `SPNV` or `SGV`
* `products`: integer, 3 (SPFV), 24 (SPNV), 1920 (SGV)

### icoL

This is the list of icons used by the elements of the `himL` array.

* `res`: string, reference key of the icon, which can be mapped to a relative URL using `dyn.js`

### remL

This type seems to be used as a key value store. Each instance of this type represents a key value pair.

* `code`: string – key
* `txtN`: string – value (might be `false`!)
* `type`: string, often `M`

Common values for `code` are:

* isFreetext
* dbnetz_subcategory1stLevel
* dbnetz_effects: serveral values encoded as JSON but with escaping of quotation marks
* dbnetz_subcategory2ndLevel
* dbnetz_category
* dbnetz_prognosis

These entries are refenced from `himL`'s property `rRefL`. Each integer in `rRefL` refers to the n-th entry in the `remL` array.
