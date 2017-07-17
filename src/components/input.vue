<template>
    <label><span style={{ spanStyle }} ></span><input name= type= value= style={{ inputStyle }}/></label>
</template>

let spanStyle = {
	display: 'block',
	marginBottom: '5px',
	fontSize: '15px'
};

let inputStyle = {
	width: '100%',
	marginBottom: '10px',
	fontSize: 20,
	padding: 5
};

export default {
    name: 'input',
    data () {
        return {
            name: 'Sign Up',
            text: 'Sign Up',
            type: 'Sign Up',
            value: 'Sign Up'
        }
    }, 
}
