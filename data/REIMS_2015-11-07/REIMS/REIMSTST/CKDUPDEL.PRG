* ckdupdel
* 06/25/09
CLOSE DATA
SELE B
USE del10
INDEX on sku to del10.idx
SELE A
USE adisp
SET RELA to sku INTO del10
BROW FIELDS adisp.sku, del10.sku

