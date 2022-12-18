const router = require('express').Router()
const Person = require('../models/Person')

// POST - Criação de dados
router.post('/', async (req, res) => {
    const {name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved,
    }

    //console.log(name)

    try{
        await Person.create(person)

        if (!name) {
            res.status(422).json({error: 'O nome é obrigatório'})
            return
        }
        res.status(201).json({message: 'Pessoa incluída com sucesso!'})

    }catch (error) {
        res.status(500).json({error: error})
    }
})


router.get('/', async (req, res) => {

    try {
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person){
            res.status(422).json({ message: 'O usuário não foi encontrado'})
            return
        }
        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {name, salary, approved,}

    try {
        const updatadePerson = await Person.updateOne({ _id: id }, person)

        if (updatadePerson.matchedCount === 0){
            res.status(422).json({ message: 'O usuário não foi encontrado'})
            return
        }        
        
        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person){
            res.status(422).json({ message: 'O usuário não foi encontrado'})
            return
        }

        await Person.deleteOne({ _id : id})
        res.status(200).json({message: 'O usuário foi removido com sucesso'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

module.exports = router
