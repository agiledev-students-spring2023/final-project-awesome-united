set -e
while getopts i flag
do
    case "${flag}" in
        i) install=true;;
    esac
done

cd ./front-end/ 

if [ "$install" = true ]
then
    echo Installing front-end packages...
    npm install
    echo Successfully installed front-end packages.
fi
echo Building front end...
npm run build
echo Built front end.
cd ../back-end/

if [ $install ]
then
    echo Installing back-end packages...
    npm install
    echo Successfully installed back-end packages.
fi
echo Running server...
npm start