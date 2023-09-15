from App import *
from UserAPIs import *
from AdminAPI import *

if __name__=='__main__':
    checkPendingReports()
    App.run(debug=True,port=5000)