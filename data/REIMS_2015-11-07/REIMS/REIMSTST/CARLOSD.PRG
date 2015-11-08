* carlosd.prg
****To delete the ones that Carlos dispensed

CLOSE DATA
count=0
use carlosd.dbf
SELECT 2
USE GETFILE() EXCLUSIVE
SELECT 1
SET ORDER TO TAG Sku OF GETFILE() IN Glsku
SET RELATION TO sku INTO Glsku ADDITIVE

SCAN
	IF carlosd.sku = glsku.sku
		SELE 2
		REPLACE glsku.enterdate WITH carlosd.enterdate
		DELE
		count = count + 1
		SELE 1
	ENDIF	
ENDSCAN

WAIT WINDOW STR(count,5) + " deleted"
