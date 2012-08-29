'''
Created on Aug 28, 2012

@package: Superdesk
@copyright: 2012 Sourcefabric o.p.s.
@license: http://www.gnu.org/licenses/gpl-3.0.txt
@author: Mugur Rus
'''

from glob import glob
from os.path import join, dirname, abspath, isdir
from shutil import copy
from os import makedirs

# --------------------------------------------------------------------

if __name__ == '__main__':
    filePath = abspath(__file__)
    sourceDist = join(dirname(dirname(dirname(filePath))), 'distribution')
    destDist = join(dirname(dirname(filePath)), 'distribution')
    for dir in ('components', 'plugins'):
        dstDir = join(destDist, dir)
        if not isdir(dstDir): makedirs(dstDir)
        for egg in glob(join(sourceDist, dir, '*.egg')):
            print('Copying %s\n     to %s' % (egg, dstDir))
            copy(egg, dstDir)