* deltX.prg Delete if tint = "X"
* 05/10/08 modified 8/30/08
*HJC
CLOSE DATA
delcount = 0
SELE B
USE GETFILE()
REPLACE B->tint WITH UPPER(B->tint) ALL
INDEX ON ALLTRIM(sku) TO del.IDX
SELE A
USE glsku
SET RELA TO ALLTRIM(sku) INTO B
SCAN
    
    IF ALLTRIM(B->tint) = "X" 
		REPLACE enterdate WITH DATE()
		DELETE
		delcount = delcount +1
	ENDIF	
ENDSCAN
WAIT WINDOW STR(delcount) + " deleted"
